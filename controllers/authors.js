const db = require('../models');
const Author = db.authors;
const mongoose = require('mongoose');

exports.create = (req, res) => {
    // #swagger.tags=["Authors"]
    // Validate request
    if (!req.body.author_first_name || !req.body.author_last_name) {
        res.status(400).send({ message: "Please include the author's first and last name."})
        return;
    }

    // Add an author
    const author = new Author({
        author_first_name: req.body.author_first_name,
        author_last_name: req.body.author_last_name,
        author_birthdate: req.body.author_birthdate,
        author_nationality: req.body.author_nationality,
        author_awards: req.body.author_awards,
        author_books: req.body.author_books,
        author_genres: req.body.author_genres,
    });

    // Save author in the database
    author
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || 'An error occured while creating the author.'
            });
        });
};

exports.findAll = (req, res) => {
    // #swagger.tags=["Authors"]
    Author.find(
        {},
        {
            author_first_name: 1,
            author_last_name: 1,
            author_birthday: 1,
            author_nationality: 1,
            author_awards: 1,
            author_books: 1,
            author_genres: 1,
        }
    )
        .then ((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'An error occured while retrieving Authors',
            });
        });
};

// Find a single author with an id
exports.findOne = (req, res) => {
    // #swagger.tags=["Authors"]
    const author_id = req.params.author_id;
    Author.findById(author_id)
    .then((data) => {
        if (!data)
            res
            .status(404)
            .send({ message: "No author found with id " + author_id });
        else res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error retrieving Author with author_id " + author_id,
        });
    });
};

// update an existing author
exports.updateAuthor = (req, res) => {
    // #swagger.tags=["Authors"]
    const author_id = req.params.author_id;

    // validate request body
    if (!author_id) {
        return res.status(400).send({ message: "Please include an author ID!" });
    }

    // validate book_id
    if (!mongoose.Types.ObjectId.isValid(author_id)) {
        return res.status(400).send({ message: "Invalid author ID!"});
    }

    // Use findByIdAndUpdate to update one author
    Author.findByIdAndUpdate(
        author_id, // ID to select the author to update
        req.body, // Data to be updated in selected author
        { new: true } // Options: return the updated document
    )
        .then((data) => {
            if (!data) {
                // if no author was found with the provided ID
                return res.status(404).send({ message: 'No author found with id: ' + author_id});
            }
            // Successfully updated the author, return the updated document
            res.send(data);
        })
        .catch((err) => {
            // Handle any errors that occur during the update
            console.error(`Error updating the book with id: ${book_id}:`, err);
            res.status(500).send({ message: 'Error updating the book with id: ' + book_id });
        });
};

exports.deleteAuthor = async (req, res) => {
    // #swagger.tags=["Authors"]
    const author_id = req.params.author_id;
    if (!author_id) {
        return res.status(400).send({ message: "Please include an author ID!" })
    }

    if (!mongoose.Types.ObjectId.isValid(author_id)) {
        return res.status(400).send({ message: "Invalid author ID!"})
    }

    try {
        // find and delete the author by ID
        const result = await Author.findByIdAndDelete(author_id);

        if (!result) {
            return res.status(404).send({ message: "No author found with id: " + author_id })
        }

        // Successfully deleted the project
        res.status(200).send({ message: "Author deleted successfully"
        })

    } catch (err) {
        console.error(`Error deleting author: ${err.message}`);
        res.status(500).send({ message: 'Error occured while trying to delete the author' })
    }
}