const router = require('express').Router();
const books = require('../controllers/books');
const authors = require('../controllers/authors');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Book Routes
router.get('/books',
  /* #swagger.tags=["Books"] */
  books.findAll);

router.get('/books/:book_id',
  /* #swagger.tags=["Books"] */
  /* #swagger.parameters['book_id'] = { description: 'ID of the book to retrieve', type: 'string' } */
  books.findOne);

router.post('/books',
  /* #swagger.tags=["Books"] */
  /* #swagger.parameters['book'] = {
      in: 'body',
      description: 'Book object to be created',
      required: true,
      schema: {
          $book_name: 'Book test two',
          $book_author: 'Ana Monteiro',
          $book_genre: 'Mistery',
          $book_summary: 'This is the summary for a test book 2.',
          $book_published: '2025',
          $book_isbn: 'adjfklasdjfkl2893812',
          $book_pages: 500
      }
  } */
  books.create);

router.put('/books/:book_id',
  /* #swagger.tags=["Books"] */
  /* #swagger.parameters['book_id'] = { 
      in: 'path',
      description: 'ID of the book to update',
      type: 'string',
      required: true
  } */
  /* #swagger.parameters['book_data'] = { 
      in: 'body',
      description: 'Book object to be updated',
      required: true,
      schema: {
          $book_name: 'Updated Book Name',
          $book_author: 'Updated Author',
          $book_genre: 'Updated Genre',
          $book_summary: 'Updated summary for the book.',
          $book_published: '2025',
          $book_isbn: 'updatedisbn123456',
          $book_pages: 600
      }
  } */
  books.updateBook);

router.delete('/books/:book_id',
  /* #swagger.tags=["Books"] */
  /* #swagger.parameters['book_id'] = { description: 'ID of the book to delete', type: 'string' } */
  books.deleteBook);

// Author Routes
router.get('/authors',
  /* #swagger.tags=["Authors"] */
  /* #swagger.description = 'Retrieve all authors' */
  authors.findAll);

router.get('/authors/:author_id',
  /* #swagger.tags=["Authors"] */
  /* #swagger.parameters['author_id'] = { description: 'ID of the author to retrieve', type: 'string' } */
  authors.findOne);

router.post('/authors',
  /* #swagger.tags=["Authors"] */
  /* #swagger.parameters['author'] = {
      in: 'body',
      description: 'Author object to be created',
      required: true,
      schema: {
          $author_first_name: 'John',
          $author_last_name: 'Doe',
          $author_birthdate: '1980',
          $author_nationality: 'American',
          $author_awards: ['Best Author 2020'],
          $author_books: ['John Doe\'s Book'], 
          $author_genres: ['Fiction', 'Mystery']
      }
  } */
  authors.create);

router.put('/authors/:author_id',
  /* #swagger.tags=["Authors"] */
  /* #swagger.parameters['author_id'] = {
      in: 'path',
      description: 'ID of the author to update',
      type: 'string',
      required: true
  } */
  /* #swagger.parameters['author_data'] = { 
      in: 'body',
      description: 'Author object to be updated',
      required: true,
      schema: {
          $author_first_name: 'Updated First Name',
          $author_last_name: 'Updated Last Name',
          $author_birthdate: '1985',
          $author_nationality: 'British',
          $author_awards: ['Best Author 2021'],
          $author_books: ['Updated Book Name'], 
          $author_genres: ['Non-Fiction', 'Science']
      }
  } */
  authors.updateAuthor);

router.delete('/authors/:author_id',
  /* #swagger.tags=["Authors"] */
  /* #swagger.parameters['author_id'] = { description: 'ID of the author to delete', type: 'string' } */
  authors.deleteAuthor);

module.exports = router;