import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    username: String,
    password: String,
    books: {
        default: [],
        type: [Schema.ObjectId],
        ref: 'Book'
    }
})

export default model('User', userSchema)