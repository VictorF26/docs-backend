import { Router } from "express";
const router = Router();
import { getBook, createBook, getBooks, updateBook, deleteBook } from "../controllers/books.js";

router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/', createBook);
router.patch('/:id', updateBook)
router.delete('/:id', deleteBook)

export default router;