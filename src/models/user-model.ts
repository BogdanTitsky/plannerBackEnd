import Joi from 'joi';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const schemaSignUp = Joi.object({
    name: Joi.string().required().min(1),
    email: Joi.string().email(),
    password: Joi.string().required().min(6),
});

const User = mongoose.model('User', userSchema);

export default User;
