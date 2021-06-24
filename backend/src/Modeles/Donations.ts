import { model,Schema } from 'mongoose';
class Dontations extends Schema {
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
export default model('donations', new Dontations());