const router = require('express').Router();
const books = require('../controllers/books');
const authors = require('../controllers/authors');
const users = require('../controllers/users');
const loans = require('../controllers/loans');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
  res.send('Welcome to Bookflow API!');
});

// User Routes
router.get('/users',
  protect,
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Retrieve all users' */
  /* #swagger.description = 'Retrieves a list of all users. Requires active session and admin role.' */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (Admin role required)' } */
  users.findAll);

router.get('/users/:user_id',
  protect,
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Retrieve a user by ID' */
  /* #swagger.parameters['user_id'] = { description: 'ID of the user to retrieve', type: 'string' } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  users.findOne);

router.post('/users',
  protect,
  authorizeRoles('admin'),
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Create a new user (Admin Only)' */
  /* #swagger.description = 'Creates a new user account via admin panel. Requires active session and admin role.' */
  /* #swagger.parameters['user'] = {
      in: 'body',
      description: 'User object to be created',
      required: true,
      schema: {
          "$firstName": "Enter First Name",
          "$lastName": "Enter Last Name",
          "$birthday": "1999-01-01",
          "$email": "Enter Email",
          "$password": "Enter Password",
          "$role": "user",
          "$phoneNumber": "+1234567890"
      }
  } */
  /* #swagger.responses[201] = { description: 'User created successfully' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (Admin role required)' } */
  users.create);

router.put('/users/:user_id',
  protect,
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Update a user by ID' */
  /* #swagger.description = 'Updates a user by ID. Requires active session.' */
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
          "$firstName": "Updated First Name",
          "$lastName": "Updated Last Name",
          "$birthday": "1999-01-01",
          "$email": "Updated Email",
          "$password": "Updated Password",
          "$role": "user",
          "$phoneNumber": "+1234567890"
      }
  } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  users.updateUser);

router.delete('/users/:user_id',
  protect,
  authorizeRoles('admin'),
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Delete a user by ID (Admin Only)' */
  /* #swagger.description = 'Deletes a user by ID. Requires active session and admin role.' */
  /* #swagger.parameters['user_id'] = { description: 'ID of the user to delete', type: 'string' } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (Admin role required)' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  users.deleteUser);

// Book Routes
router.get('/books',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Retrieve all books' */
  /* #swagger.responses[200] = { description: 'OK' } */
  books.findAll);

router.get('/books/:book_id',
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Retrieve a book by ID' */
  /* #swagger.parameters['book_id'] = { description: 'ID of the book to retrieve', type: 'string' } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  books.findOne);

router.post('/books',
  protect,
  authorizeRoles('admin'),
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Create a new book' */
  /* #swagger.description = 'Creates a new book. Requires active session and admin role.' */
  /* #swagger.parameters['book'] = {
      in: 'body',
      description: 'Book object to be created',
      required: true,
      schema: {
          "$book_name": "Enter Book Name",
          "$book_author": "Author Name",
          "$book_genre": "Genre",
          "$book_summary": "Add a summary for the book",
          "$book_published": 2023,
          "$book_isbn": "Enter the ISBN number",
          "$book_pages": 100
      }
  } */
  /* #swagger.responses[201] = { description: 'Created' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (Admin role required)' } */
  books.create);

router.put('/books/:book_id',
  protect,
  authorizeRoles('admin'),
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Update a book by ID' */
  /* #swagger.description = 'Updates a book by ID. Requires active session and admin role.' */
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
          "$book_name": "Updated Book Name",
          "$book_author": "Updated Author",
          "$book_genre": "Updated Genre",
          "$book_summary": "Updated summary for the book.",
          "$book_published": 2025,
          "$book_isbn": "updatedisbn123456",
          "$book_pages": 600
      }
  } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (Admin role required)' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  books.updateBook);

router.delete('/books/:book_id',
  protect,
  authorizeRoles('admin'),
  /* #swagger.tags = ['Books'] */
  /* #swagger.summary = 'Delete a book by ID' */
  /* #swagger.description = 'Deletes a book by ID. Requires active session and admin role.' */
  /* #swagger.parameters['book_id'] = { description: 'ID of the book to delete', type: 'string' } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (Admin role required)' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  books.deleteBook);

// Author Routes
router.get('/authors',
  /* #swagger.tags = ['Authors'] */
  /* #swagger.summary = 'Retrieve all authors' */
  /* #swagger.description = 'Retrieve all authors' */
  /* #swagger.responses[200] = { description: 'OK' } */
  authors.findAll);

router.get('/authors/:author_id',
  /* #swagger.tags = ['Authors'] */
  /* #swagger.summary = 'Retrieve an author by ID' */
  /* #swagger.parameters['author_id'] = { description: 'ID of the author to retrieve', type: 'string' } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  authors.findOne);

router.post('/authors',
  protect,
  authorizeRoles('admin'),
  /* #swagger.tags = ['Authors'] */
  /* #swagger.summary = 'Create a new author' */
  /* #swagger.description = 'Creates a new author. Requires active session and admin role.' */
  /* #swagger.parameters['author'] = {
      in: 'body',
      description: 'Author object to be created',
      required: true,
      schema: {
          "$author_first_name": "John",
          "$author_last_name": "Doe",
          "$author_birthdate": "1980-01-01",
          "$author_nationality": "American",
          "$author_awards": ["Best Author 2020"],
          "$author_books": ["60d5ec49f1c7d23a6c8e4f1a"],
          "$author_genres": ["Fiction", "Mystery"]
      }
  } */
  /* #swagger.responses[201] = { description: 'Created' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (Admin role required)' } */
  authors.create);

router.put('/authors/:author_id',
  protect,
  authorizeRoles('admin'),
  /* #swagger.tags = ['Authors'] */
  /* #swagger.summary = 'Update an author by ID' */
  /* #swagger.description = 'Updates an author by ID. Requires active session and admin role.' */
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
          "$author_first_name": "Updated First Name",
          "$author_last_name": "Updated Last Name",
          "$author_birthdate": "1985-01-01",
          "$author_nationality": "British",
          "$author_awards": ["Best Author 2021"],
          "$author_books": ["60d5ec49f1c7d23a6c8e4f1b"],
          "$author_genres": ["Non-Fiction", "Science"]
      }
  } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (Admin role required)' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  authors.updateAuthor);

router.delete('/authors/:author_id',
  protect,
  authorizeRoles('admin'),
  /* #swagger.tags = ['Authors'] */
  /* #swagger.summary = 'Delete an author by ID' */
  /* #swagger.description = 'Deletes an author by ID. Requires active session and admin role.' */
  /* #swagger.parameters['author_id'] = { description: 'ID of the author to delete', type: 'string' } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (Admin role required)' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  authors.deleteAuthor);

// Loan Routes
router.get('/loans',
  protect,
  /* #swagger.tags = ['Loans'] */
  /* #swagger.summary = 'Retrieve all loans' */
  /* #swagger.description = 'Retrieves all loans. Requires active session.' */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (if role-based access is applied)' } */
  loans.findAll);

router.get('/loans/:loan_id',
  protect,
  /* #swagger.tags = ['Loans'] */
  /* #swagger.summary = 'Retrieve a loan by ID' */
  /* #swagger.description = 'Retrieves a loan by ID. Requires active session.' */
  /* #swagger.parameters['loan_id'] = { description: 'ID of the loan to retrieve', type: 'string' } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (if role-based access is applied)' } */
  loans.findOne);

router.post('/loans',
  protect,
  /* #swagger.tags = ['Loans'] */
  /* #swagger.summary = 'Create a new loan' */
  /* #swagger.description = 'Creates a new loan. Requires active session.' */
  /* #swagger.parameters['loan'] = {
      in: 'body',
      description: 'Loan object to be created',
      required: true,
      schema: {
          "$user_id": "Enter User ID",
          "$book_id": "Enter Book ID",
          "$loanDate": "2023-01-01",
          "$dueDate": "2023-02-01",
          "$returnDate": "2023-03-01",
          "$status": "active"
      }
  } */
  /* #swagger.responses[201] = { description: 'Created' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (if role-based access is applied)' } */
  loans.create);

router.put('/loans/:loan_id',
  protect,
  /* #swagger.tags = ['Loans'] */
  /* #swagger.summary = 'Update a loan by ID' */
  /* #swagger.description = 'Updates a loan by ID. Requires active session.' */
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
          "$user_id": "Updated User ID",
          "$book_id": "Updated Book ID",
          "$loanDate": "2023-01-01",
          "$dueDate": "2023-02-01",
          "$returnDate": "2023-03-01",
          "$status": "returned"
      }
  } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (if role-based access is applied)' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  loans.updateLoan);

router.delete('/loans/:loan_id',
  protect,
  authorizeRoles('admin'),
  /* #swagger.tags = ['Loans'] */
  /* #swagger.summary = 'Delete a loan by ID' */
  /* #swagger.description = 'Deletes a loan by ID. Requires active session and admin role.' */
  /* #swagger.parameters['loan_id'] = { description: 'ID of the loan to delete', type: 'string' } */
  /* #swagger.responses[200] = { description: 'OK' } */
  /* #swagger.responses[400] = { description: 'Bad Request' } */
  /* #swagger.responses[401] = { description: 'Unauthorized (No active session)' } */
  /* #swagger.responses[403] = { description: 'Forbidden (if role-based access is applied)' } */
  /* #swagger.responses[404] = { description: 'Not Found' } */
  loans.deleteLoan);

module.exports = router;