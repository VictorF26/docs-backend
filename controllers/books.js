import Book from '../models/Book.js'

export const getBook = async (req, res) => {
    const {id} = req.params
    try{
        res.status(200).json(await Book.findById(id))
    }catch(err){
        res.status(404).json({message: 'book not found'})
    }
}

export const createBook = async (req, res) => {
    const {name, author} = req.body;
    const newBook = new Book({
        name,
        author
    })
    try{
        await Book.create(newBook)
        res.status(200).json({user: newBook})
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const getBooks = async (req, res) => {
    try{
        res.status(200).json(await Book.find())
    }catch(err){
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const updateBook = async (req, res) => {
    const {id} = req.params;
    const {name, author} = req.body;
    try{
        const nbook = await Book.findByIdAndUpdate(id, {name, author}, {new: true})
        console.log(nbook);
        res.status(200).json(nbook)
    }catch(err){
        res.status(500).json({message: 'Internal Error: Something went wrong'})
    }
}

export const deleteBook = async (req, res) =>{
    const {id} = req.params
    try {
        await Book.findByIdAndDelete(id)
        res.status(200).json({message: 'Book deleted successfully'})
    } catch (error) {
        res.status(500).json({message: 'Internal Server error'})
    }
}