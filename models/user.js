module.exports = (mongoose) => {
    const UserSchema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthday: {
            type: Date,
            required: true,
            validate: {
                validator: (value) => value < new Date(),
                message: 'Enter a valid date'
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: value => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value);
                }
            }
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: value => {
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                    return passwordRegex.test(value);
                },
                message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.'
            }
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
            required: true
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: value => {
                    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
                    return phoneRegex.test(value);
                }
            }
        }
    });

    const User = mongoose.model('user', UserSchema);
    return User;
};