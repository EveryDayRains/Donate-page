"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_rate_limit_1 = __importDefault(require("fastify-rate-limit"));
const da_1 = __importDefault(require("@/Servies/da"));
const Donations_1 = __importDefault(require("@/Modeles/Donations"));
const mongoose_1 = __importDefault(require("mongoose"));
const point_of_view_1 = __importDefault(require("point-of-view"));
//@ts-ignore
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const Tokens_1 = __importDefault(require("@/Modeles/Tokens"));
const routers_1 = __importDefault(require("@/routers"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
class ApiWorker {
    constructor(data) {
        this.app = fastify_1.default();
        this.port = data.port;
        this.ip = data.ip;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.io = socket_io_1.default(this.app.server, {
            cors: {
                origin: process.env.CORS_URL,
                methods: ["GET", "POST"],
                credentials: true
            }
        });
    }
    async start() {
        //MONGODB
        mongoose_1.default.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        mongoose_1.default.connection.on('connected', () => {
            console.log('Success connect to MongoDB!');
        });
        //DONATIONALERTS
        if (process.env.DA_SECRET)
            await new da_1.default(Donations_1.default, Tokens_1.default).init();
        //SOCKET.IO
        this.io.on('connection', async (socket) => {
            socket.send('Connected!');
            console.log('Site connected!');
            socket.on('donations', async () => {
                socket.emit('donations', await Donations_1.default.find().sort({ 'time': 'desc' }).then((x) => x));
            });
        });
        //API
        this.app.register(fastify_rate_limit_1.default, {
            max: 100,
            timeWindow: 3 * 60 * 1000,
            cache: 5000,
            addHeaders: {
                'x-ratelimit-limit': true,
                'x-ratelimit-reset': true,
                'x-ratelimit-remaining': true,
                'retry-after': true,
            }
        });
        this.app.register(fastify_cors_1.default, { origin: process.env.CORS_URL });
        this.app.register(point_of_view_1.default, {
            engine: {
                ejs: ejs_1.default
            },
            root: path_1.default.join(__dirname, '../../views')
        });
        this.app.setErrorHandler((error, request, response) => {
            switch (response.statusCode) {
                case 421:
                    response.send({
                        error: 'От вас поступает слишком много запросов, повторите попытку позже', code: 421
                    });
                    break;
            }
        });
        this.app.setNotFoundHandler(function (req, res) {
            res.status(404).send({ code: 404 });
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        routers_1.default.forEach((x) => this.app.route(x));
        this.app.listen(this.port, this.ip, async (err) => {
            if (err)
                throw err;
            console.log(this.app.printRoutes());
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            console.log(`Server listening on ${await this.app.server.address()?.port}`);
        });
    }
}
exports.default = ApiWorker;
