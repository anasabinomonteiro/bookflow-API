const router = require('express').Router();
const books = require('../controllers/books');
const authors = require('../controllers/authors');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Book Routes
router.get('/',
  /* #swagger.tags=["Books"] */
  books.findAll);

router.get('/:book_id',
  /* #swagger.tags=["Books"] */
  /* #swagger.parameters['book_id'] = { description: 'ID of the book to retrieve' } */
  books.findOne);

router.post('/',
  /* #swagger.tags=["Books"] */
  /* #swagger.parameters['book'] = {
      in: 'body',
      description: 'Book object to be created',
      required: true,
      schema: {
          $book_name: 'The Great Gatsby',
          $book_author: 'F. Scott Fitzgerald',
          $book_genre: 'Fiction',
          $book_summary: 'A novel set in the 1920s about the mysterious Jay Gatsby.',
          $book_published: '1925-04-10',
          $book_isbn: '9780743273565',
          $book_pages: 180
      }
  } */
  books.create);

router.put('/:book_id',
  /* #swagger.tags=["Books"] */
  /* #swagger.parameters['book_id'] = { description: 'ID of the book to update' } */
  books.updateBook);

router.delete('/:book_id',
  /* #swagger.tags=["Books"] */
  /* #swagger.parameters['book_id'] = { description: 'ID of the book to delete' } */
  books.deleteBook);

// Author Routes
router.get('/',
  /* #swagger.tags=["Authors"] */
  /* #swagger.description = 'Retrieve all authors' */
  authors.findAll);

router.get('/:author_id',
  /* #swagger.tags=["Authors"] */
  /* #swagger.parameters['author_id'] = { description: 'ID of the author to retrieve' } */
  authors.findOne);

router.post('/',
  /* #swagger.tags=["Authors"] */
  /* #swagger.parameters['author'] = {
      in: 'body',
      description: 'Author object to be created',
      required: true,
      schema: {
          $author_first_name: 'John',
          $author_last_name: 'Doe',
          $author_birthdate: '1980-01-01',
          $author_nationality: 'American',
          $author_awards: ['Best Author 2020'],
          $author_books: [],
          $author_genres: ['Fiction', 'Mystery']
      }
  } */
  authors.create);

router.put('/:author_id',
  /* #swagger.tags=["Authors"] */
  /* #swagger.parameters['author_id'] = { description: 'ID of the author to update' } */
  authors.updateAuthor);

router.delete('/:author_id',
  /* #swagger.tags=["Authors"] */
  /* #swagger.parameters['author_id'] = { description: 'ID of the author to delete' } */
  authors.deleteAuthor);

module.exports = router;