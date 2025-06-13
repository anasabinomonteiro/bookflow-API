const db = require('../models');
const Loan = db.loan;
const mongoose = require('mongoose');

// Create and Save a new loan
exports.create = (req, res) => {
    // #swagger.tags=["Loans"]
    // Validate request
    if (!req.body.user_id || !req.body.book_id || !req.body.loanDate || !req.body.dueDate) {
        res.status(400).send({ message: "Please include a user_id, book_id, loanDate, and dueDate!" });
        return;
    }

    // Add a loan
    const loan = new Loan({
        user_id: req.body.user_id,
        book_id: req.body.book_id,
        loanDate: new Date(req.body.loanDate),
        dueDate: new Date(req.body.dueDate),
        returnDate: req.body.returnDate ? new Date(req.body.returnDate) : null,
        status: req.body.status || 'active'
    })

    loan
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while creating the loan.',

            });
        });
};

// Find all loans
exports.findAll = (req, res) => {
    // #swagger.tags=["Loans"]
    Loan.find(
        {},
        {
            user_id: 1,
            book_id: 1,
            loanDate: 1,
            dueDate: 1,
            returnDate: 1,
            status: 1
        }
    )

        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Loans.",
            });
        });
};

// Find a single loan with an id
exports.findOne = (req, res) => {
    // #swagger.tags=["Loans"]
    const loan_id = req.params.loan_id;
    Loan.findById(loan_id)
        .then((data) => {
            if (!data)
                res
                    .status(404)
                    .send({ message: `No loan found with id ${loan_id}` });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving loan with id ${loan_id}`,
            });
        });
};

// Update an existing loan
exports.updateLoan = (req, res) => {
    // #swagger.tags=["Loans"]
    const loan_id = req.params.loan_id;

    // validate request body
    if (!loan_id)
        return res.status(400).send({
            message: "Please include a loan_id in the request!"
        });

    // Validate loan_id
    if (!mongoose.Types.ObjectId.isValid(loan_id)) {
        return res.status(400).send({
            message: "Invalid loan_id!"
        });
    }

    Loan.findByIdAndUpdate(
        loan_id, // ID to select the loan to update
        req.body, // Data to be updated
        { new: true } // Options: return the updated document
    )
        .then((data) => {
            if (!data) {
                // if no loan was found with the provided ID
                return res.status(404).send({ message: `No loan found for id ${loan_id}` });
            }
            // Successfully updated the loan, return the updated document
            res.send(data);
        })
        .catch((err) => {
            // Handle any errors that occur during the update
            console.error(`Error updating the loan with id: ${loan_id}:`, err);
            res.status(500).send({
                message: `Error updating the loan with id ${loan_id}: ${err.message}`
            });
        });
};

// Delete a loan with the specified id
exports.deleteLoan = async (req, res) => {
    // #swagger.tags=["Loans"]
    const loan_id = req.params.loan_id;

    if (!loan_id) {
        return res.status(400).send({ 
            message: "Please include a loan ID!"
        });
    }

    if (!mongoose.Types.ObjectId.isValid(loan_id)) {
        return res.status(400).send({
            message: "Invalid book ID!"
        })
    }

    try {
        // find and delete the loan by ID
        const result = await Loan.findByIdAndDelete(loan_id);

        if (!result) {
            return res.status(404).send({
                message: `No loan found with id: ${loan_id}`
            });
        }

        // Successfully deleted the loan
        res.status(200).send({
            message: "Loan deleted successfully"
        })
    } catch (err) {
        console.error(`Error deleting the loan with id: ${loan_id}:`, err.message);
        res.status(500).send({
            message: `Error occured while trying to delete the loan`
        });
    }
}