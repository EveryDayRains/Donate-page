import { model,Schema } from 'mongoose';
class Tokens extends Schema {
    constructor() {
        super({
            userid: String,
            accessToken: String,
            exp: Number
        });
    }
}
export default model('tokens', new Tokens());