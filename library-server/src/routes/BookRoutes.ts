import express from 'express';
import BookController from '../controllers/BookController';

const router = express.Router();

router.get('/', BookController.getAllBooks);
router.post('/', BookController.createBook);
router.put('/', BookController.updateBook);
router.delete('/:barcode', BookController.deleteBook);
router.get('/query', BookController.searchForBooksByQuery);

export default router;