"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register.js");
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("@/index"));
dotenv_1.default.config();
const port = process.env.PORT;
new index_1.default({ port, ip: '0.0.0.0' }).start();
if (!process.env.QIWI_SECRET_KEY)
    console.log('Qiwi secret key isn\'t provided, Qiwi service disabled');
if (!process.env.DA_SECRET)
    console.log('DonationsAlert secret key isn\'t provided, DonationsAlert service disabled');
process.on('unhandledRejection', console.log);
