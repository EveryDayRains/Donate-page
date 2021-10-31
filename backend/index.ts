import 'module-alias/register.js'
import Dotenv from 'dotenv';
import ApiWorker from "@/index";
Dotenv.config();
const port = process.env.PORT;
new ApiWorker({port, ip: '0.0.0.0'}).start();
if(!process.env.QIWI_SECRET_KEY) console.log('Qiwi secret key isn\'t provided, Qiwi service disabled');
if(!process.env.YOOMONEY_NUMBER) console.log('Yoomoney secret key isn\'t provided, Yoomoney service disabled');
process.on('unhandledRejection', console.log);
