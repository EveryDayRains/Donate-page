"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Dontations extends mongoose_1.Schema {
    constructor() {
        super({
            id: String,
            username: String,
            money: String,
            comment: String,
            time: Number
        });
    }
}
exports.default = mongoose_1.model('donations', new Dontations());
