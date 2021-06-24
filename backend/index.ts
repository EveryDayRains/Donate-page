import 'module-alias/register.js'
import Dotenv from 'dotenv';
import ApiWorker from "@/index";
Dotenv.config();
const port = process.env.PORT;
new ApiWorker({port, ip: '0.0.0.0'}).start();
if(!process.env.QIWI_SECRET_KEY) console.log('Qiwi secret key isn\'t provided, Qiwi service disabled');
if(!process.env.DA_SECRET) console.log('DonationsAlert secret key isn\'t provided, DonationsAlert service disabled');
process.on('unhandledRejection', console.log);