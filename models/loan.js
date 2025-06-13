module.exports = (mongoose) => {
    const LoanSchema = new mongoose.Schema({
        user_id: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
            required: true
        },
        loanDate: {
            type: Date,
            required: true 
        },
        dueDate: {
            type: Date,
            required: true
        },
        returnDate: {
            type: Date
        },
        status: {
            type: String,
            enum: ['active', 'returned', 'overdue'],
            default: 'active'
        }
    }, {
        timestamps: true
    });

    return mongoose.model('Loan', LoanSchema); 
};
