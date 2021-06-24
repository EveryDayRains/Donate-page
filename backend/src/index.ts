import fastify, {
    FastifyError,
    FastifyInstance,
    FastifyRequest,
    FastifyReply,
    RouteOptions
} from 'fastify';
import fastifyRateLimit from "fastify-rate-limit";
import DonationAlertsWatcher from "@/Servies/da";
import donations from '@/Modeles/Donations';
import mongoose, { Model } from 'mongoose';
import pointOfView from "point-of-view";
//@ts-ignore
import fastifyCors from "fastify-cors";
import io, { Server } from 'socket.io';
import tokens from '@/Modeles/Tokens';
import routers from '@/routers';
import path from 'path';
import ejs from 'ejs';
class ApiWorker {

    private readonly port: number;
    private readonly ip: string;
    private app: FastifyInstance;
    private io: Server;

    constructor(data: Api) {
        this.app = fastify();
        this.port = data.port;
        this.ip = data.ip;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.io = io(this.app.server,{
            cors: {
                origin: process.env.CORS_URL,
                methods: ["GET", "POST"],
                credentials: true
            }
        });
    }
   async start(): Promise<void> {

        //MONGODB
       mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        mongoose.connection.on('connected',()=> {
            console.log('Success connect to MongoDB!');
        });

        //DONATIONALERTS
        if(process.env.DA_SECRET) await new DonationAlertsWatcher(donations, tokens).init()
        //SOCKET.IO
        this.io.on('connection', async (socket: Socket) => {
            socket.send('Connected!');
            console.log('Site connected!');
            socket.on('donations',async () => {
                socket.emit('donations', await donations.find().sort({'time': 'desc'}).then((x: Model<Donations>) => x));
            });
        });

        //API
        this.app.register(fastifyRateLimit, {
            max: 100,
            timeWindow: 3 * 60 * 1000,
            cache: 5000,
            addHeaders: {
                'x-ratelimit-limit': true,
                'x-ratelimit-reset': true,
                'x-ratelimit-remaining': true,
                'retry-after': true,
            }
        })

       this.app.register(fastifyCors, { origin: process.env.CORS_URL })

       this.app.register(pointOfView, {
            engine: {
                ejs
            },
            root: path.join(__dirname,'../../views')
        })
        this.app.setErrorHandler((error: FastifyError, request: FastifyRequest, response: FastifyReply) => {
            switch (response.statusCode) {
                case 421:
                    response.send({
                        error: 'От вас поступает слишком много запросов, повторите попытку позже', code: 421
                    })
                    break
            }
        });
        this.app.setNotFoundHandler(function(req: FastifyRequest, res: FastifyReply) {
            res.status(404).send({code: 404});
        })

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        routers.forEach((x: RouteOptions) => this.app.route(x))

        this.app.listen(this.port, this.ip, async (err: Error) => {
            if (err) throw err;
            console.log(this.app.printRoutes())
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            console.log(`Server listening on ${await this.app.server.address()?.port}`)
        });


    }
}
export default ApiWorker;
