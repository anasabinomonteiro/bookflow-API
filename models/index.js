const dbConfig = require('../database/database');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.books = require('./books')(mongoose);
db.authors = require('./authors')(mongoose);

module.exports = db;