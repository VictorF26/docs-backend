import { Router } from "express";
const router = Router();
import {getUsers, getUser, createUser, updateUser, deleteUser, addBook, removeBook, getBooks} from '../controllers/users.js'

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:id/books', getBooks)
router.post('/', createUser)
router.post('/addbook/:id', addBook)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.delete('/removeBook/:id', removeBook)

export default router