import {Schema, model} from 'mongoose'

const bookSchema = new Schema({
    name: String,
    author: String
})

export default model('Book', bookSchema)