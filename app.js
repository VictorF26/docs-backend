import express from 'express'
import morgan from 'morgan';
import usersRouter from './router/users.js'
import booksRouter from './router/books.js'

const app = express();
await import('./mongo.js');

// middlewares
app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('<p>hello world</p>')
})

app.use('/api/users', usersRouter)
app.use('/api/books', booksRouter)

export default app