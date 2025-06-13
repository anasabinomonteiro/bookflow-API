const router = require('express').Router();
const books = require('../controllers/books');
const authors = require('../controllers/authors');
const users = require('../controllers/users');
const loans = require('../controllers/loans');

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
          $book_published: 'Enter the year of publication',
          $book_isbn: 'Enter the ISBN number',
          $book_pages: 100
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
          $book_published: 2025,
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
          $author_birthdate: '1980-01-01',
          $author_nationality: 'American',
          $author_awards: ['Best Author 2020'],
          $author_books: ['Book Ids'], 
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
          $author_birthdate: '1985-01-01',
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
          $birthday: '1999-01-01',
          $email: 'Enter Email',
          $password: 'Enter Password',
          $role: '"user" or "admin"',
          $phoneNumber: '+1234567890'
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
          $firstName: 'Updated First Name',
          $lastName: 'Updated Last Name',
          $birthday: '1999-01-01',
          $email: 'Updated Email',
          $password: 'Updated Password',
          $role: '"user" or "admin"',
          $phoneNumber: '+1234567890'
      }
  } */
  users.updateUser);

router.delete('/users/:user_id', 
  /* #swagger.tags=["Users"] */
  /* #swagger.parameters['user_id'] = { description: 'ID of the user to delete', type: 'string' } */
  users.deleteUser);

// Loan Routes
router.get('/loans',
  /* #swagger.tags=["Loans"] */
  loans.findAll);

router.get('/loans/:loan_id',
  /* #swagger.tags=["Loans"] */
  /* #swagger.parameters['loan_id'] = { description: 'ID of the loan to retrieve', type: 'string' } */
  loans.findOne);

router.post('/loans',
  /* #swagger.tags=["Loans"] */
  /* #swagger.parameters['loan'] = {
      in: 'body',
      description: 'Loan object to be created',
      required: true,
      schema: {
          $user_id: 'Enter User ID',
          $book_id: 'Enter Book ID',
          $loanDate: '2023-01-01',
          $dueDate: '2023-02-01',
          $returnDate: '2023-03-01',
          $status: '"active", "overdue", or "returned"',
      }
  } */
  loans.create);

router.put('/loans/:loan_id',
  /* #swagger.tags=["Loans"] */
  /* #swagger.parameters['loan_id'] = {
      in: 'path',
      description: 'ID of the loan to update',
      type: 'string',
      required: true
  } */
  /* #swagger.parameters['loan_data'] = { 
      in: 'body',
      description: 'Loan object to be updated',
      required: true,
      schema: {
          $user_id: 'Updated User ID',
          $book_id: 'Updated Book ID',
          $loanDate: '2023-01-01',
          $dueDate: '2023-02-01',
          $returnDate: '2023-03-01',
          $status: '"active", "overdue", or "returned"',
      }
  } */
  loans.updateLoan);

router.delete('/loans/:loan_id',
  /* #swagger.tags=["Loans"] */
  /* #swagger.parameters['loan_id'] = { description: 'ID of the loan to delete', type: 'string' } */
  loans.deleteLoan);

module.exports = router;