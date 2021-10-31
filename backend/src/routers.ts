import Oauth2 from '@/Servies/oauth2';
import Qiwi from '@/Servies/qiwi';
import Yoomoney from '@/Servies/yoomoney';
import Donations from "@/Modeles/Donations";
import Tokens from "@/Modeles/Tokens";
import { FastifyReply, FastifyRequest } from "fastify";
export = [
    {
        method: 'GET',
        path: '/',
        handler: (req: FastifyRequest, res:FastifyReply) => {
            res.code(200).send(
                { statusCode: 200, message: 'API works! Don\'t worry!' })
        }
    },
    {
        method: 'GET',
        path: '/oauth2/discord/callback',
        handler: (req: FastifyRequest,res: FastifyReply) => {
            new Oauth2(Tokens)?.Discordlogin(req,res)
        },
    },
    {
        method: 'GET',
        path: '/oauth2/vk/callback',
        handler: (req: FastifyRequest,res: FastifyReply) => {
            new Oauth2(Tokens)?.VKAuthorization(req,res)
        },
    },
    {
        method: 'GET',
        path: '/oauth2/vk/authorize',
        handler: (req: FastifyRequest,res: FastifyReply) => {
            res.redirect(encodeURI(`https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&redirect_uri=${process.env.VK_REDIRECT_URL}&display=page&response_type=code`))
        },
    },
    {
        method: 'GET',
        path: '/oauth2/discord/authorize',
        handler: (req: FastifyRequest,res: FastifyReply) => {
          res.redirect(encodeURI(`https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.DISCORD_REDIRECT_URL}&response_type=code&scope=identify`))
        },
    },
    {
        method: 'GET',
        path: '/oauth2/user',
        handler: (req: FastifyRequest, res: FastifyReply) => {
            new Oauth2(Tokens)?.getUser(req,res)
        }
    },
    {
        method: 'POST',
        path: '/qiwi/callback',
        handler: (req: FastifyRequest, res: FastifyReply) => {
            new Qiwi(Donations, Tokens)?.receivePayment(req,res)
        }
    },
    {
        method: 'POST',
        path: '/qiwi/create',
        handler: (req: FastifyRequest, res: FastifyReply) => {
            new Qiwi(Donations, Tokens)?.createBill(req,res)
        }
    },
    {
        method: 'POST',
        path: '/yoomoney/create',
        handler: (req: FastifyRequest, res: FastifyReply) => {
            new Yoomoney(Donations, Tokens)?.createhash(req,res)
        }
    },
    {
        method: 'POST',
        path: '/yoomoney/callback',
        handler: (req: FastifyRequest, res: FastifyReply) => {
            new Yoomoney(Donations, Tokens)?.RecivePayments(req,res)
        }
    }
]
