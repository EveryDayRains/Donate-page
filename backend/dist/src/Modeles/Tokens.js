"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Tokens extends mongoose_1.Schema {
    constructor() {
        super({
            userid: String,
            accessToken: String,
            exp: Number
        });
    }
}
exports.default = mongoose_1.model('tokens', new Tokens());
