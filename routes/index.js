const router = require('express').Router();
const books = require('../controllers/books');
const authors = require('../controllers/authors');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Book Routes
router.get('/', books.findAll);
router.get('/:book_id', books.findOne);
router.post('/', books.create);
router.put('/:book_id', books.updateBook);
router.delete('/:book_id', books.deleteBook);

// Author Routes
router.get('/', authors.findAll);
router.get('/:author_id', authors.findOne);
router.post('/', authors.create);
router.put('/:author_id', authors.updateAuthor);
router.delete('/:author_id', authors.deleteAuthor);

module.exports = router;