import Joi from 'joi';
import mongoose, { Schema } from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        categoryId: {
            type: Schema.Types.ObjectId,

            ref: 'Category',
        },
        name: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        date: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const schemaCreateTask = Joi.object({
    name: Joi.string().required().min(1),
    categoryId: Joi.string(),
    date: Joi.string().required(),
});

export const schemaEditTask = Joi.object({
    name: Joi.string().min(1).optional(),
    categoryId: Joi.string().optional(),
    isCompleted: Joi.boolean().optional(),
    date: Joi.string().required().optional(),
}).or('name', 'categoryId', 'date', 'isCompleted');

const Task = mongoose.model('Task', taskSchema);

export default Task;
