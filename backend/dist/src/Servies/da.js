"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const socket_io_client_1 = __importDefault(require("socket.io-client"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const hashes = new Map();
class DonationAlertsWatcher {
    constructor(db, tokens) {
        this.db = db;
        this.tokens = tokens;
        //@ts-ignore
        this.io = socket_io_client_1.default('wss://socket.donationalerts.ru:443');
    }
    async init() {
        this.io.emit('add-user', { token: process.env.DA_SECRET, type: 'minor' });
        this.io.on("donation", async (msg) => {
            const { id, message, amount, currency, amount_main, username } = JSON.parse(msg);
            const ReciveDonation = async (username, amount, currency, amount_main, message) => {
                const money = `${amount} ${(currency !== "RUB") ? `${currency} (${amount_main} RUB)` : currency}`;
                console.log(`Новый донат от ${username}! Через систему Donation Alerts`);
                await this.db.create({
                    id,
                    username,
                    money,
                    comment: message,
                    time: Date.now()
                });
            };
            if (hashes.has(username)) {
                jsonwebtoken_1.default.verify(hashes.get(username), process.env.JWT_SECRET, async (err, data) => {
                    if (err)
                        return await ReciveDonation(username, amount, currency, amount_main, message);
                    switch (data.type) {
                        case 'discord':
                            {
                                const tokendata = await this.tokens.findOne({
                                    userid: data?.id.toString(),
                                    exp: data.exp
                                }).then(x => x);
                                const response = await axios_1.default.get('https://discord.com/api/users/@me', {
                                    headers: {
                                        authorization: `Bearer ${tokendata?.accessToken}`
                                    }
                                }).catch(() => {
                                    return null;
                                });
                                if (!response?.data.id)
                                    return null;
                                hashes.delete(username);
                                await ReciveDonation(response?.data.username + "#" + response?.data.discriminator, amount, currency, amount_main, message);
                            }
                            break;
                        case 'vk':
                            {
                                const response = await axios_1.default.get(`https://api.vk.com/method/users.get?user_ids=${Number(data.id)}&v=5.131&fields=photo_400_orig&access_token=${process.env.VK_API_KEY}&lang=ru`)
                                    .catch(() => {
                                    return null;
                                });
                                hashes.delete(username);
                                await ReciveDonation(response?.data.response[0].first_name + " " + response?.data.response[0].last_name, amount, currency, amount_main, message);
                            }
                            break;
                    }
                });
            }
            else {
                await ReciveDonation(username, amount, currency, amount_main, message);
            }
        });
    }
    async createhash(req, res) {
        if (!req.headers.authorization)
            return res.status(401).send({ code: 401, message: "Unauthorized" });
        jsonwebtoken_1.default.verify(req.headers.authorization, process.env.JWT_SECRET, (err) => {
            if (err)
                return res.code(404).send({ code: 404, message: "Not found" });
            function Createhash() {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                for (let i = 0; i < 10; i++) {
                    result += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return result;
            }
            const hash = Createhash();
            hashes.set(hash, req.headers.authorization);
            res.send({ hash });
        });
    }
}
exports.default = DonationAlertsWatcher;
