import mongoose from 'mongoose'
import {MONGODB_URL} from './config.js'

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("DB is connected")
    })