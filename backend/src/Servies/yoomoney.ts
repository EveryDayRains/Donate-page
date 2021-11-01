// @ts-ignore
import jwt from "jsonwebtoken";
import {Model} from "mongoose";
import { FastifyReply, FastifyRequest } from "fastify";
import axios, {AxiosResponse} from "axios";
import crypto from 'crypto';
const hashes = new Map()
class Yoomoney {
    private db: Model<Donations | unknown>;
    private tokens: Model<Tokens | unknown>

    constructor(db: Model<Donations | unknown>, tokens: Model<Tokens | unknown>) {
        this.db = db;
        this.tokens = tokens;
    }
   async RecivePayments(req: FastifyRequest, res: FastifyReply): Promise<void> {
       let body = req.body as Yoomoneydata
       res.send(200);
       if(body.sha1_hash
            ===
            crypto.createHash('sha1')
                .update(`${body.notification_type}&${body.operation_id}&${body.amount}&${body.currency}&${body.datetime}&${body.sender}&${body.codepro}&${process.env.YOOMONEY_CALLBACK_SECRET}&${body.label}`
                ).digest('hex')
        ) return;
            const { withdraw_amount, label, operation_id } = body;
            if(withdraw_amount < hashes.get(Number(label)).amount) return;
            const ReciveDonation = async (username: string, amount: string | number, money: string, message: string) => {
                console.log(`Новый донат от ${username}! Через систему Yoomoney`);
                await this.db.create({
                    operation_id,
                    username,
                    money,
                    comment: message,
                    time: Date.now()
                });
            }
                jwt.verify(hashes.get(Number(body.label)).token, process.env.JWT_SECRET, async (err: Error, data: Record<string, any>) => {
                     switch (data.type) {
                         case 'discord': {
                             const tokendata = await this.tokens.findOne({
                                 userid: data?.id.toString(),
                                 exp: data.exp
                             }).then(x => x)
                             const response: AxiosResponse | null = await axios.get('https://discord.com/api/users/@me', {
                                 headers: {
                                     // @ts-ignore
                                     authorization: `Bearer ${tokendata?.accessToken}`
                                 }
                             }).catch(() => {
                                 return null;
                             });
                             if (!response?.data.id) return null;
                             hashes.delete(label)
                             await ReciveDonation(response?.data.username + "#" + response?.data.discriminator, withdraw_amount, 'RUB',hashes.get(Number(body.label)).comment)
                         }
                         break;
                         case 'vk': {
                             const response: AxiosResponse | null =
                                 await axios.get(`https://api.vk.com/method/users.get?user_ids=${Number(data.id)}&v=5.131&fields=photo_400_orig&access_token=${process.env.VK_API_KEY}&lang=ru`)
                                     .catch(() => {
                                         return null;
                                     });
                             hashes.delete(label)
                             await ReciveDonation(response?.data.response[0].first_name + " " + response?.data.response[0].last_name, withdraw_amount, 'RUB',hashes.get(Number(body.label)).comment)
                         }
                         break;
                     }
                })

    }
    async createhash(req: FastifyRequest, res: FastifyReply): Promise<void> {
        if(!req.headers.authorization) return res.status(401).send({code: 401, message:"Unauthorized"});
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err: Error) => {
            if(err) return res.code(404).send({code: 404, message: "Not found"});
            //@ts-ignore
            let { comment, amount } = JSON.parse(req.body);
            if(!req.body) return res.status(400).send({code: 400, message: 'Bad requesst'})
            amount = Number(amount)
            console.log(comment, amount)
            if(!comment || !amount) return res.status(400).send({code: 400, message: 'Bad requetst'});
            if(amount < 10) return res.status(400).send({code: 400, message: 'Bad requestt'});
            function getRandomInt(min: number, max: number) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            const hash = getRandomInt(1000, 100000)
            hashes.set(hash, {
                token: req.headers.authorization,
                comment,
                amount
            });
            res.send({url: encodeURI(`https://yoomoney.ru/quickpay/confirm.xml?receiver=${process.env.YOOMONEY_NUMBER}&quickpay-form=shop&targets=Пожертвование для MrLivixx&paymentType=SB&sum=${amount}&label=${hash}&successURL=${process.env.CORS_URL}`)})
        })
    }
}
export default Yoomoney;
