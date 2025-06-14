const db = require('../models');
const User = db.user;
const mongoose = require('mongoose');

exports.create = (req, res) => {
    // #swagger.tags=["Users"]
    // Validate request
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        res.status(400).send({ message: "Please include a first name, last name, email, and password." });
        return;
    }

    // Add a user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || 'user',
        phoneNumber: req.body.phoneNumber,
    })

    // Save user in the database
    user
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while creating the user.',
            });
        });
};

exports.findAll = async (req, res) => {
    try {
        const data = await User.find();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
};

exports.findOne = async (req, res) => {
    const { user_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).send({ message: 'Invalid user ID format.' });
    }
    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send({
                message: `No user found with id ${user_id}`
            });
        }
        res.send(user);
    } catch (err) {
        res.status(500).send({
            message: `Error retrieving User with user_id ${user_id}`
        });
    }
};

// update an existing user
exports.updateUser = (req, res) => {
    // #swagger.tags=["Users"]
    const user_id = req.params.user_id;

    // validate request body
    if (!user_id) {
        return res.status(400).send({ message: "Please include a user ID!" });
    }

    // validate user_id
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).send({ message: "Invalid user ID!" });
    }

    const allowedUpdates = ['firstName', 'lastName', 'birthday', 'email', 'password', 'role', 'phoneNumber'];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(400).send({ message: "Error with the request body. Please include only valid fields: " + allowedUpdates.join(', ') });
    }

    // Use findByIdAndUpdate to update one user
    User.findByIdAndUpdate(
        user_id, // ID to select the user to update
        req.body, // Data to be updated in selected user
        { new: true } // Options: return the updated document
    )
        .then((data) => {
            if (!data) {
                // if no user was found with the provided ID
                return res.status(404).send({ message: 'No user found with id: ' + user_id });
            }
            // Successfully updated the user, return the updated document
            res.send(data);
        })
        .catch((err) => {
            // Handle any errors that occur during the update
            console.error(`Error updating the user with id: ${user_id}:`, err);
            res.status(500).send({ message: 'Error updating the user with id: ' + user_id });
        });
};

exports.deleteUser = async (req, res) => {
    // #swagger.tags=["Users"]
    const user_id = req.params.user_id;

    if (!user_id) {
        return res.status(400).send({ message: "Please include a user ID!" })
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).send({ message: "Invalid user ID!" })
    }

    try {
        // find and delete the user by ID
        const result = await User.findByIdAndDelete(user_id);

        if (!result) {
            return res.status(404).send({ message: "No user found with id: " + user_id })
        }

        // Successfully deleted the user
        res.status(200).send({
            message: "User deleted successfull"
        })

    } catch (err) {
        console.error(`Error deleting user: ${err.message}`);
        res.status(500).send({ message: 'Error occured while trying to delete the user' })
    }
}