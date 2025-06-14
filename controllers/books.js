const db = require('../models');
const Book = db.books;
const mongoose = require('mongoose');

exports.create = (req, res) => {
    // #swagger.tags=["Books"]
    // Validate request
    if (!req.body.book_name) {
        res.status(400).send({ message: "Please include data!" });
        return;
    }

    // Add a book
    const book = new Book({
        book_name: req.body.book_name,
        book_author: req.body.book_author,
        book_genre: req.body.book_genre,
        book_summary: req.body.book_summary,
        book_published: req.body.book_published,
        book_isbn: req.body.book_isbn,
        book_pages: req.body.book_pages,
    });

    // Save book in the database
    book
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while creating the book.',
            });
        });
};

exports.findAll = async (req, res) => {
    // #swagger.tags=["Books"]
    try {
        const data = await Book.find();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    }
};

exports.findOne = async (req, res) => {
    // #swagger.tags=["Books"]
    try {
        const book = await Book.findById(req.params.book_id);
        if (!book) {
            return res.status(404).send({
                message: `No book found with id ${req.params.book_id}`
            });
        }
        res.send(book);
    } catch (err) {
        res.status(500).send({
            message: `Error retrieving Book with book_id ${req.params.book_id}`
        });
    }
};

// update an existing book
exports.updateBook = (req, res) => {
    // #swagger.tags=["Books"]
    const book_id = req.params.book_id;

    // validate request body
    if (!book_id) {
        return res.status(400).send({ message: "Please include a book ID!" });
    }

    // validate book_id
    if (!mongoose.Types.ObjectId.isValid(book_id)) {
        return res.status(400).send({ message: "Invalid book ID!" });
    }

    // Use findByIdAndUpdate to update one book
    Book.findByIdAndUpdate(
        book_id, // ID to select the book to update
        req.body, // Data to be updated in selected book
        { new: true } // Options: return the updated document
    )
        .then((data) => {
            if (!data) {
                // if no book was found with the provided ID
                return res.status(404).send({ message: 'No book found with id: ' + book_id });
            }
            // Successfully updated the book, return the updated document
            res.send(data);
        })
        .catch((err) => {
            // Handle any errors that occur during the update
            console.error(`Error updating the book with id: ${book_id}:`, err);
            res.status(500).send({ message: 'Error updating the book with id: ' + book_id });
        });
};

exports.deleteBook = async (req, res) => {
    // #swagger.tags=["Books"]
    const book_id = req.params.book_id;

    if (!book_id) {
        return res.status(400).send({ message: "Please include a book ID!" })
    }

    if (!mongoose.Types.ObjectId.isValid(book_id)) {
        return res.status(400).send({ message: "Invalid book ID!" })
    }

    try {
        // find and delete the book by ID
        const result = await Book.findByIdAndDelete(book_id);

        if (!result) {
            return res.status(404).send({ message: "No book found with id: " + book_id })
        }

        // Successfully deleted the book
        res.status(200).send({
            message: "Book deleted successfull"
        })

    } catch (err) {
        console.error(`Error deleting book: ${err.message}`);
        res.status(500).send({ message: 'Error occured while trying to delete the book' })
    }
}