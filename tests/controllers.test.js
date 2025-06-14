// __tests__/controllers.test.js
jest.setTimeout(30000); // 30 seconds
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Import controllers
const authorsController = require('../controllers/authors');
const booksController = require('../controllers/books');
const usersController = require('../controllers/users');
const loansController = require('../controllers/loans');

// Import models
const db = require('../models');
const Author = db.authors;
const Book = db.books;
const User = db.user;
const Loan = db.loan;

// Mock response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('BookFlow API Unit Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    // Setup in-memory MongoDB for testing
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Clean database before each test
    await Author.deleteMany({});
    await Book.deleteMany({});
    await User.deleteMany({});
    await Loan.deleteMany({});
  });

  describe('Authors Controller - GET Routes', () => {
    describe('findAll', () => {
      test('should return all authors successfully', async () => {
        // Arrange
        const testAuthors = [
          {
            author_first_name: 'Marvin',
            author_last_name: 'Young',
            author_birthdate: new Date('1999-01-01'),
            author_nationality: 'American',
            author_awards: ['Best Author 2020'],
            author_genres: ['Fiction']
          },
          {
            author_first_name: 'Jane',
            author_last_name: 'williams',
            author_birthdate: new Date('1975-05-15'),
            author_nationality: 'British',
            author_awards: ['Literary Prize 2019'],
            author_genres: ['Mystery']
          }
        ];

        await Author.insertMany(testAuthors);

        const req = {};
        const res = mockResponse();

        // Act
        await authorsController.findAll(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              author_first_name: 'Marvin',
              author_last_name: 'Young'
            }),
            expect.objectContaining({
              author_first_name: 'Jane',
              author_last_name: 'williams'
            })
          ])
        );
      });

      test('should return empty array when no authors exist', async () => {
        // Arrange
        const req = {};
        const res = mockResponse();

        // Act
        await authorsController.findAll(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith([]);
      });

      test('should handle database errors', async () => {
        // Arrange
        const req = {};
        const res = mockResponse();

        // Mock database error (use a rejected promise)
        jest.spyOn(Author, 'find').mockImplementationOnce(() => Promise.reject(new Error('Database connection failed')));

        // Act
        await authorsController.findAll(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
          message: 'Database connection failed'
        });

        // Restore mock
        Author.find.mockRestore();
      });
    });

    describe('findOne', () => {
      test('should return single author by valid ID', async () => {
        // Arrange
        const testAuthor = new Author({
          author_first_name: 'marvin',
          author_last_name: 'Young',
          author_birthdate: new Date('1999-01-01'),
          author_nationality: 'American'
        });
        const savedAuthor = await testAuthor.save();

        const req = { params: { author_id: savedAuthor._id.toString() } };
        const res = mockResponse();

        // Act
        await authorsController.findOne(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            author_first_name: 'marvin',
            author_last_name: 'Young',
            _id: savedAuthor._id
          })
        );
      });

      test('should return 404 when author not found', async () => {
        // Arrange
        const nonExistentId = new mongoose.Types.ObjectId();
        const req = { params: { author_id: nonExistentId.toString() } };
        const res = mockResponse();

        // Act
        await authorsController.findOne(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
          message: `No author found with id ${nonExistentId.toString()}`
        });
      });

      test('should handle database errors', async () => {
        // Arrange
        const validId = new mongoose.Types.ObjectId();
        const req = { params: { author_id: validId.toString() } };
        const res = mockResponse();

        // Mock database error (use a rejected promise)
        jest.spyOn(Author, 'findById').mockImplementationOnce(() => Promise.reject(new Error('Database error')));

        // Act
        await authorsController.findOne(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
          message: `Error retrieving Author with author_id ${validId.toString()}`
        });

        // Restore mock
        Author.findById.mockRestore();
      });
    });
  });

  describe('Books Controller - GET Routes', () => {
    describe('findAll', () => {
      test('should return all books successfully', async () => {
        // Arrange
        const testBooks = [
          {
            book_name: 'Test Book 1',
            book_author: 'Author 1',
            book_genre: 'Fiction',
            book_summary: 'A test book',
            book_published: 2020,
            book_isbn: '1234567890',
            book_pages: 300
          },
          {
            book_name: 'Test Book 2',
            book_author: 'Author 2',
            book_genre: 'Mystery',
            book_summary: 'Another test book',
            book_published: 2021,
            book_isbn: '0987654321',
            book_pages: 250
          }
        ];

        await Book.insertMany(testBooks);

        const req = {};
        const res = mockResponse();

        // Act
        await booksController.findAll(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              book_name: 'Test Book 1',
              book_author: 'Author 1'
            }),
            expect.objectContaining({
              book_name: 'Test Book 2',
              book_author: 'Author 2'
            })
          ])
        );
      });

      test('should return empty array when no books exist', async () => {
        // Arrange
        const req = {};
        const res = mockResponse();

        // Act
        await booksController.findAll(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith([]);
      });
    });

    describe('findOne', () => {
      test('should return single book by valid ID', async () => {
        // Arrange
        const testBook = new Book({
          book_name: 'Test Book',
          book_author: 'Test Author',
          book_genre: 'Fiction',
          book_isbn: '1234567890'
        });
        const savedBook = await testBook.save();

        const req = { params: { book_id: savedBook._id.toString() } };
        const res = mockResponse();

        // Act
        await booksController.findOne(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            book_name: 'Test Book',
            book_author: 'Test Author',
            _id: savedBook._id
          })
        );
      });

      test('should return 404 when book not found', async () => {
        // Arrange
        const nonExistentId = new mongoose.Types.ObjectId();
        const req = { params: { book_id: nonExistentId.toString() } };
        const res = mockResponse();

        // Act
        await booksController.findOne(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
          message: `No book found with id ${nonExistentId.toString()}`
        });
      });
    });
  });

  describe('Users Controller - GET Routes', () => {
    describe('findAll', () => {
      test('should return all users successfully', async () => {
        // Arrange
        const testUsers = [
          {
            firstName: 'marvin',
            lastName: 'Young',
            birthday: new Date('1990-01-01'),
            email: 'young@example.com',
            password: 'Password123',
            role: 'user'
          },
          {
            firstName: 'Jane',
            lastName: 'williams',
            birthday: new Date('1985-05-15'),
            email: 'jane@example.com',
            password: 'Password456',
            role: 'admin'
          }
        ];

        await User.insertMany(testUsers);

        const req = {};
        const res = mockResponse();

        // Act
        await usersController.findAll(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              firstName: 'marvin',
              lastName: 'Young', // <-- Capital Y to match test data
              email: 'young@example.com'
            }),
            expect.objectContaining({
              firstName: 'Jane',
              lastName: 'williams',
              email: 'jane@example.com'
            })
          ])
        );
      });

      test('should return empty array when no users exist', async () => { // <-- Capital Y to match test data
        // Arrange
        const req = {};
        const res = mockResponse();

        // Act
        await usersController.findAll(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith([]);
      });
    });

    describe('findOne', () => {
      test('should return single user by valid ID', async () => {
        // Arrange
        const testUser = new User({
          firstName: 'marvin',
          lastName: 'young',
          birthday: new Date('1990-01-01'),
          email: 'young@example.com',
          password: 'Password123',
          role: 'user'
        });
        const savedUser = await testUser.save();

        const req = { params: { user_id: savedUser._id.toString() } };
        const res = mockResponse();

        // Act
        await usersController.findOne(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: 'marvin',
            lastName: 'young',
            email: 'young@example.com',
            _id: savedUser._id
          })
        );
      });

      test('should return 404 when user not found', async () => {
        // Arrange
        const nonExistentId = new mongoose.Types.ObjectId();
        const req = { params: { user_id: nonExistentId.toString() } };
        const res = mockResponse();

        // Act
        await usersController.findOne(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
          message: `No user found with id ${nonExistentId.toString()}`
        });
      });

      test('should return 400 for invalid user ID format', async () => {
        // Arrange
        const invalidId = 'invalid-id-format';
        const req = { params: { user_id: invalidId } };
        const res = mockResponse();

        // Act
        await usersController.findOne(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
          message: 'Invalid user ID format.'
        });
      });
    });
  });

  describe('Loans Controller - GET Routes', () => {
    describe('findAll', () => {
      test('should return all loans successfully', async () => {
        // Arrange
        const testUser = new User({
          firstName: 'marvin',
          lastName: 'young',
          birthday: new Date('1990-01-01'),
          email: 'young@example.com',
          password: 'Password123'
        });
        const savedUser = await testUser.save();

        const testBook = new Book({
          book_name: 'Test Book',
          book_author: 'Test Author',
          book_genre: 'Fiction',
          book_isbn: '1234567890'
        });
        const savedBook = await testBook.save();

        const testLoans = [
          {
            user_id: savedUser._id,
            book_id: savedBook._id,
            loanDate: new Date('2023-01-01'),
            dueDate: new Date('2023-02-01'),
            status: 'active'
          }
        ];

        await Loan.insertMany(testLoans);

        const req = {};
        const res = mockResponse();

        // Act
        await loansController.findAll(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              user_id: savedUser._id,
              book_id: savedBook._id,
              status: 'active'
            })
          ])
        );
      });

      test('should return empty array when no loans exist', async () => {
        // Arrange
        const req = {};
        const res = mockResponse();

        // Act
        await loansController.findAll(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith([]);
      });
    });

    describe('findOne', () => {
      test('should return single loan by valid ID', async () => {
        // Arrange
        const testUser = new User({
          firstName: 'John',
          lastName: 'Doe',
          birthday: new Date('1990-01-01'),
          email: 'john@example.com',
          password: 'Password123'
        });
        const savedUser = await testUser.save();

        const testBook = new Book({
          book_name: 'Test Book',
          book_author: 'Test Author',
          book_genre: 'Fiction',
          book_isbn: '1234567890'
        });
        const savedBook = await testBook.save();

        const testLoan = new Loan({
          user_id: savedUser._id,
          book_id: savedBook._id,
          loanDate: new Date('2023-01-01'),
          dueDate: new Date('2023-02-01'),
          status: 'active'
        });
        const savedLoan = await testLoan.save();

        const req = { params: { loan_id: savedLoan._id.toString() } };
        const res = mockResponse();

        // Act
        await loansController.findOne(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            user_id: savedUser._id,
            book_id: savedBook._id,
            status: 'active',
            _id: savedLoan._id
          })
        );
      });

      test('should return 404 when loan not found', async () => {
        // Arrange
        const nonExistentId = new mongoose.Types.ObjectId();
        const req = { params: { loan_id: nonExistentId.toString() } };
        const res = mockResponse();

        // Act
        await loansController.findOne(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
          message: `No loan found with id ${nonExistentId.toString()}`
        });
      });
    });
  });
});