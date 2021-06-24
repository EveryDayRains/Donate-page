"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const url_1 = require("url");
class Oauth2 {
    constructor(db) {
        this.db = db;
    }
    async Discordlogin(req, res) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const code = req.query?.code;
        if (!code)
            return res.redirect('/oauth2/discord/authorize');
        const response = await axios_1.default.post('https://discord.com/api/oauth2/token', new url_1.URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            redirect_uri: process.env.DISCORD_REDIRECT_URL,
            code,
            grant_type: 'authorization_code',
            scope: 'identify',
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).catch(() => { return res.status(500).send({ code: 500, message: "Internal server error" }); });
        const { access_token } = response?.data;
        if (!access_token)
            return res.redirect('/oauth2/discord/authorize');
        const getuser = await axios_1.default.get('https://discord.com/api/users/@me', {
            headers: {
                authorization: `Bearer ${access_token}`
            }
        }).catch(() => { return res.status(500).send({ code: 500, message: "Internal server error" }); });
        const { id } = getuser.data;
        if (!id)
            return res.redirect('/oauth2/discord/authorize');
        const token = jsonwebtoken_1.default.sign({ id, type: 'discord' }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' });
        await this.db.create({
            userid: id,
            accessToken: access_token,
            exp: await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET).exp
        });
        res.view('index.ejs', {
            token
        });
    }
    async VKAuthorization(req, res) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const code = req.query?.code;
        if (!code)
            return res.redirect('/oauth2/vk/authorize');
        const user = await axios_1.default.get(`https://oauth.vk.com/access_token?client_id=${process.env.VK_CLIENT_ID}&client_secret=${process.env.VK_CLIENT_SECRET}&redirect_uri=${process.env.VK_REDIRECT_URL}&code=${code}`)
            .catch((x) => {
            if (x?.response?.data?.error === 'invalid_grant')
                return res.redirect('/oauth2/vk/authorize');
            else
                return res.status(500).send({ code: 500, message: "Internal server error" });
        });
        if (!user?.data?.user_id)
            return res.redirect('/oauth2/vk/authorize');
        res.view('index.ejs', {
            token: jsonwebtoken_1.default.sign({ id: user.data.user_id, type: 'vk' }, process.env.JWT_SECRET, { algorithm: 'HS256' })
        });
    }
    async getUser(req, res) {
        if (!req.headers.authorization)
            return res.code(401).send({ code: 401, message: "Unauthorized" });
        jsonwebtoken_1.default.verify(req.headers.authorization, process.env.JWT_SECRET, async (err, data) => {
            if (err)
                return res.code(404).send({ code: 404, message: "Not found" });
            else {
                switch (data.type.toString()) {
                    case 'vk':
                        {
                            const response = await axios_1.default.get(`https://api.vk.com/method/users.get?user_ids=${Number(data.id)}&v=5.131&fields=photo_400_orig&access_token=${process.env.VK_API_KEY}&lang=ru`)
                                .catch(() => {
                                return res.status(500).send({ code: 500, message: "Internal server error" });
                            });
                            res.status(200).send({ type: 'vk', data: response.data.response[0] });
                        }
                        break;
                    case 'discord': {
                        const tokendata = await this.db.findOne({ userid: data?.id.toString(), exp: data?.exp });
                        const response = await axios_1.default.get('https://discord.com/api/users/@me', {
                            headers: {
                                authorization: `Bearer ${tokendata?.accessToken}`
                            }
                        });
                        if (!response.data.id)
                            return res.send({ code: 404, message: "Not found" });
                        res.status(200).send({ type: 'discord', data: response.data });
                    }
                }
            }
        });
    }
}
exports.default = Oauth2;
