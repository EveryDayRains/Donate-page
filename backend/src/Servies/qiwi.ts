import QiwiBillPaymentsAPI from "@qiwi/bill-payments-node-js-sdk";
import { FastifyRequest, FastifyReply } from "fastify";
import axios, { AxiosResponse } from "axios";
import { Model } from "mongoose";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import jwt from "jsonwebtoken";

class Qiwi {
    private qiwi: QiwiBillPaymentsAPI;
    private db: Model<Donations | unknown>;
    private tokens: Model<Tokens | unknown>;
    constructor(db: Model<Donations | unknown>, tokens: Model<Tokens | unknown>) {
        this.qiwi = new QiwiBillPaymentsAPI(process.env.QIWI_SECRET_KEY!);
        this.db = db;
        this.tokens = tokens;
    }
    async receivePayment(req: FastifyRequest, res: FastifyReply) : Promise<void> {
        if(!process.env.QIWI_SECRET_KEY) return res.status(503).send({code: 503, message: "Service Unavailable"})
        if(!req.headers['x-api-signature-sha256']) return res.status(401).send({code: 401, message:"Unauthorized"});
        const status = this.qiwi.checkNotificationSignature(req.headers['x-api-signature-sha256'].toString(), req.body, process.env.QIWI_SECRET_KEY!)
        if(status) {
           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
           // @ts-ignore
           const { customer, billId, amount, customFields } = req.body.bill;
            await this.db.create({
                id: billId,
                username: customer.account,
                money: amount.value + " " + amount.currency,
                comment: customFields.comment,
                time: Date.now()
            });
           console.log(`Новый донат от ${customer.account}! Через Qiwi`);
            res.status(200).send({code: 200, message: "OK"})
        } else {
            res.status(403)
        }
    }
    async createBill(req: FastifyRequest, res: FastifyReply) : Promise<void> {
        if(!process.env.QIWI_SECRET_KEY) return res.status(503).send({code: 503, message: "Service Unavailable"})
        if(!req.headers.authorization) return res.status(401).send({code: 401, message:"Unauthorized"});
        jwt.verify(req.headers.authorization,process.env.JWT_SECRET, async (err: Error, data: Record<string, number>) => {
            if (err) return res.code(404).send({code: 404, message: "Not found"});
            else {
                if(req.body == null) return res.status(400).send({code: 400, message: 'Bad request'})
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let { comment, amount } = JSON.parse(req.body);
                amount = Number(amount)
                if(!comment || !amount) return res.status(400).send({code: 400, message: 'Bad request'});
                if(amount < 10) return res.status(400).send({code: 400, message: 'Bad request'});
                const createbill = (amount: number, comment: string, data: string | number) => {
                    this.qiwi.createBill(this.qiwi.generateId(), {
                        amount,
                        currency: 'RUB',
                        comment: `Пожертвование для MrLivixx. Комментарий ${comment}`,
                        expirationDateTime: this.qiwi.getLifetimeByDay(1),
                        account: data,
                        customFields: {comment, themeCode: process.env.QIWI_THEME}
                    }).then(data => {
                        res.status(200).send({payUrl: data.payUrl});
                        console.log(data)
                    }).catch((e: Error) => {
                        console.log(e.stack);
                        res.status(500).send({code: 500, message: "Internal server error"})
                    });
                }
                switch (data.type.toString()) {
                    case 'discord': {
                        const tokendata = await this.tokens.findOne({userid: data?.id.toString(), exp: data?.exp})
                        const response: AxiosResponse = await axios.get('https://discord.com/api/users/@me',{
                            headers: {
                                //@ts-ignore
                                authorization: `Bearer ${tokendata?.accessToken}`
                            }
                        }).catch(() => {return res.status(403).send({code: 403, message: 'Forbidden'})});
                        if(!response?.data?.id) return res.status(403).send({code: 403, message: 'Forbidden'})
                        createbill(amount, comment, `${response?.data?.username}#${response?.data?.discriminator}`)
                    }
                    break;
                    case 'vk': {
                        const response: AxiosResponse =
                            await axios.get(`https://api.vk.com/method/users.get?user_ids=${Number(data.id)}&v=5.131&fields=photo_400_orig&access_token=${process.env.VK_API_KEY}&lang=ru`)
                                .catch(() => {
                                    return res.status(500).send({code: 500, message: "Internal server error"})
                                });
                        createbill(amount, comment, `${response?.data?.response[0]?.first_name} ${response?.data?.response[0]?.last_name}`)
                    }
                }

            }
        })
    }
}
export default Qiwi;