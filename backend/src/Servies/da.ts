// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import io from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import jwt from "jsonwebtoken";
import {Model} from "mongoose";
import { FastifyReply, FastifyRequest } from "fastify";
import axios, {AxiosResponse} from "axios";
const hashes = new Map()
class DonationAlertsWatcher {
    private io: Socket;
    private db: Model<Donations | unknown>;
    private tokens: Model<Tokens | unknown>

    constructor(db: Model<Donations | unknown>, tokens: Model<Tokens | unknown>) {
        this.db = db;
        this.tokens = tokens;
        //@ts-ignore
        this.io = io('wss://socket.donationalerts.ru:443');
    }
   async init(): Promise<void> {
        this.io.emit('add-user',{ token: process.env.DA_SECRET, type: 'minor' })
        this.io.on("donation", async (msg) => {
            const { id, message, amount, currency, amount_main, username } = JSON.parse(msg) as Donationalerts;

            const ReciveDonation = async (username: string, amount: string | number, currency: string, amount_main: number, message: string) => {
                const money = `${amount} ${(currency !== "RUB") ? `${currency} (${amount_main} RUB)` : currency}`;
                console.log(`Новый донат от ${username}! Через систему Donation Alerts`);
                await this.db.create({
                    id,
                    username,
                    money,
                    comment: message,
                    time: Date.now()
                });
            }

            if(hashes.has(username)) {
                jwt.verify(hashes.get(username), process.env.JWT_SECRET, async (err: Error, data: Record<string, any>) => {
                    if(err) return await ReciveDonation(username, amount, currency, amount_main, message);
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
                             hashes.delete(username)
                             await ReciveDonation(response?.data.username + "#" + response?.data.discriminator, amount, currency, amount_main, message)
                         }
                         break;
                         case 'vk': {
                             const response: AxiosResponse | null =
                                 await axios.get(`https://api.vk.com/method/users.get?user_ids=${Number(data.id)}&v=5.131&fields=photo_400_orig&access_token=${process.env.VK_API_KEY}&lang=ru`)
                                     .catch(() => {
                                         return null;
                                     });
                             hashes.delete(username)
                             await ReciveDonation(response?.data.response[0].first_name + " " + response?.data.response[0].last_name, amount, currency, amount_main, message)
                         }
                         break;
                     }
                })
            } else {
                await ReciveDonation(username, amount, currency, amount_main, message)
            }
        });
    }
    async createhash(req: FastifyRequest, res: FastifyReply): Promise<void> {
        if(!req.headers.authorization) return res.status(401).send({code: 401, message:"Unauthorized"});
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err: Error) => {
            if(err) return res.code(404).send({code: 404, message: "Not found"});
            function Createhash() {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                for (let i = 0; i < 10; i++) {
                    result += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return result;
            }

            const hash = Createhash()
            hashes.set(hash, req.headers.authorization);
            res.send({hash})
        })
    }
}
export default DonationAlertsWatcher;