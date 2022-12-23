import mongoose from 'mongoose';
import User from '../models/User.js'
import {DIR} from '../config.js'
import fetch from 'node-fetch'
import Book from '../models/Book.js';

export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.send(users).status(200);
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const getUser = async (req, res) => {
    try{
        res.json(await User.find({_id: req.params.id})).status(200)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const createUser = async (req, res) => {
    const {username, password} = req.body;
    const newUser = new User({
        username,
        password
    })
    try{
        await User.create(newUser)
        res.status(200).json({book: newUser})
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const updateUser = async (req, res) => {
    const {id: _id} = req.params;
    const user = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    try{
        res.status(200).json(await User.findByIdAndUpdate(_id, user, {new: true}))
    }catch(err){
        res.status(404).json({message: 'Something went wrong'})
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'Post deleted successfully'})
    }catch(err){
        res.status(404).json({message: 'Something went wrong'})
    }
}

export const addBook = async (req, res) => {
    const {id} = req.params;
    const {bookid} = req.body
    try{
        const user = await User.findById(id);
        const ubooks = user.books
        fetch(`${DIR}/books/${bookid}`)
            .then(res => res.json())
            .then(async (data) => {
                let book = data;
                console.log(user)
                console.log(book)
                const nuser = await User.findByIdAndUpdate(id,{books: [...ubooks, mongoose.Types.ObjectId(book._id)]});
                console.log(nuser);
                res.status(200).json({message: 'All OK'})
            })
    }catch(err){
        console.log(err)
        res.status(404).json({message: 'Something went wrong'})
    }
}

export const removeBook = async (req, res) => {
    const {id} = req.params;
    const {bookid} = req.body;
    try {
        const user = await User.findById(id);
        fetch(`${DIR}/books/${bookid}`)
            .then(res => res.json())
            .then(async (data) => {
                console.log(data)
                const books = user.books.filter((item) => item.toString() !== bookid)
                await User.findByIdAndUpdate(id, {books})
                res.status(200).json({message: 'All OK'})
            })
    } catch (err) {
        console.log(err)
        res.status(404).json({message: 'Something went wrong'})
    }
}

export const getBooks = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    const booksid = user.books.map(item => item.toString())
    let books = [];
    booksid.map(async (item) => {
        console.log('band 1')
        const book = await Book.findById(item);
        console.log(book)
        books = [...books, book]
        console.log(books)
        if(books.length == booksid.length) res.status(200).json(books)
    })
}