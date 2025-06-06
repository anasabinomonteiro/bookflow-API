module.exports = (mongoose) => {
    const Author = mongoose.model('author',
        mongoose.Schema({
            author_first_name: { type: String, required: true },
            author_last_name: { type: String, required: true },
            author_birthdate: { type: Date, required: true, validate: {
                validator: (value) => value < new Date(),
                message: 'Birthdate must be in the past'
            }},
            author_nationality: { type: String },
            author_awards: { type: [String] },
            author_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }],
            author_genres: { type: [String] }
        }, {
            timestamps: true
        })
    );
    return Author
}