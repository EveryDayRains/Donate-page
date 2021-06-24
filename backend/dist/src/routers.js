"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const oauth2_1 = __importDefault(require("@/Servies/oauth2"));
const qiwi_1 = __importDefault(require("@/Servies/qiwi"));
const da_1 = __importDefault(require("@/Servies/da"));
const Donations_1 = __importDefault(require("@/Modeles/Donations"));
const Tokens_1 = __importDefault(require("@/Modeles/Tokens"));
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            res.code(200).send({ statusCode: 200, message: 'API works! Don\'t worry!' });
        }
    },
    {
        method: 'GET',
        path: '/oauth2/discord/callback',
        handler: (req, res) => {
            new oauth2_1.default(Tokens_1.default)?.Discordlogin(req, res);
        },
    },
    {
        method: 'GET',
        path: '/oauth2/vk/callback',
        handler: (req, res) => {
            new oauth2_1.default(Tokens_1.default)?.VKAuthorization(req, res);
        },
    },
    {
        method: 'GET',
        path: '/oauth2/vk/authorize',
        handler: (req, res) => {
            res.redirect(encodeURI(`https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&redirect_uri=${process.env.VK_REDIRECT_URL}&display=page&response_type=code`));
        },
    },
    {
        method: 'GET',
        path: '/oauth2/discord/authorize',
        handler: (req, res) => {
            res.redirect(encodeURI(`https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.DISCORD_REDIRECT_URL}&response_type=code&scope=identify`));
        },
    },
    {
        method: 'GET',
        path: '/oauth2/user',
        handler: (req, res) => {
            new oauth2_1.default(Tokens_1.default)?.getUser(req, res);
        }
    },
    {
        method: 'POST',
        path: '/qiwi/callback',
        handler: (req, res) => {
            new qiwi_1.default(Donations_1.default, Tokens_1.default)?.receivePayment(req, res);
        }
    },
    {
        method: 'POST',
        path: '/qiwi/create',
        handler: (req, res) => {
            new qiwi_1.default(Donations_1.default, Tokens_1.default)?.createBill(req, res);
        }
    },
    {
        method: 'POST',
        path: '/da/createhash',
        handler: (req, res) => {
            new da_1.default(Donations_1.default, Tokens_1.default)?.createhash(req, res);
        }
    }
];
