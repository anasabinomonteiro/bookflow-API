const router = require('express').Router();
const books = require('../controllers/books');
const authors = require('../controllers/authors');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Book Routes
router.get('/books', books.findAll);
router.get('/books/:book_id', books.findOne);
router.post('/books', books.create);
router.put('/books/:book_id', books.updateBook);
router.delete('/books/:book_id', books.deleteBook);

// Author Routes
router.get('/authors', authors.findAll);
router.get('/authors/:author_id', authors.findOne);
router.post('/authors', authors.create);
router.put('/authors/:author_id', authors.updateAuthor);
router.delete('/authors/:author_id', authors.deleteAuthor);

module.exports = router;