module.exports = (mongoose) => {
    const Book = mongoose.model('book',
        mongoose.Schema({
            book_name: { type: String, required: true },
            book_author: { type: String, required: true },
            book_genre: { type: String, required: true },
            book_summary: { type: String },
            book_published: { Number, min: 0 },
            book_isbn: { type: String, unique: true },
            book_pages: { type: Number, min: 1 },
        }, {
            timestamps: true
        })
    );
    return Book;
}