const router = require('express').Router();
const books = require('../controllers/books');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Book Routes
router.get('/', books.findAll);
router.get('/:book_id', books.findOne);
router.post('/', books.create);
router.put('/:book_id', books.updateBook);
router.delete('/:book_id', books.deleteBook);

module.exports = router;