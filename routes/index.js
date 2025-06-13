const router = require('express').Router();
const books = require('../controllers/books');
const authors = require('../controllers/authors');
const users = require('../controllers/users');

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
          $book_name: 'Enter Book Name',
          $book_author: 'Author Name',
          $book_genre: 'Genre',
          $book_summary: 'Add a summary for the book',
          $book_published: 'Enter the year of piblication',
          $book_isbn: 'Enter the ISBN number',
          $book_pages: 000
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

// User Routes
router.get('/users',
  /* #swagger.tags=["Users"] */
  users.findAll);
router.get('/users/:user_id',
  /* #swagger.tags=["Users"] */
  /* #swagger.parameters['user_id'] = { description: 'ID of the user to retrieve', type: 'string' } */
  users.findOne);
router.post('/users', 
  /* #swagger.tags=["Users"] */
  /* #swagger.parameters['user'] = {
      in: 'body',
      description: 'User object to be created',
      required: true,
      schema: {
          $firstName: 'Enter First Name',
          $lastName: 'Enter Last Name',
          $birthday: 1999-99-99,
          $email: 'Enter Email',
          $password: 'Enter the year of piblication',
          $role: '"user" or "admin"',
          $phoneNumber: 0000000000
      }
  } */
  users.create);
router.put('/users/:user_id', 
  /* #swagger.tags=["Users"] */
  /* #swagger.parameters['user_id'] = {
      in: 'path',
      description: 'ID of the user to update',
      type: 'string',
      required: true
  } */
  /* #swagger.parameters['user_data'] = { 
      in: 'body',
      description: 'User object to be updated',
      required: true,
      schema: {
          $firstName: 'Enter First Name',
          $lastName: 'Enter Last Name',
          $birthday: 1999-99-99,
          $email: 'Enter Email',
          $password: 'Enter the year of piblication',
          $role: '"user" or "admin"',
          $phoneNumber: 0000000000
      }
  } */
  users.updateUser);
router.delete('/users/:user_id', 
  /* #swagger.tags=["Users"] */
  /* #swagger.parameters['user_id'] = { description: 'ID of the book to delete', type: 'string' } */
  users.deleteUser);

router.delete('/authors/:author_id',
  /* #swagger.tags=["Authors"] */
  /* #swagger.parameters['author_id'] = { description: 'ID of the author to delete', type: 'string' } */
  authors.deleteAuthor);

module.exports = router;