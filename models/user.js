const bycrypt = require('bcryptjs');

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
                },
                message: 'Pleae enter a valid phone number (e.g., +1234567890)'
            }
        }
    }, {
        timestamps: true,
    });

    // Mongoose middleware
    UserSchema.pre('save', async function (next) {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bycrypt.genSalt(10);
        this.password = await bycrypt.hash(this.password, salt);
        next();
    });

    // Instance methods
    UserSchema.methods.matchPassword = async function (enteredPassword) {
        return await bycrypt.compare(enteredPassword, this.password);
    };

    const User = mongoose.model('user', UserSchema);
    return User;
};