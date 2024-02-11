import Joi from 'joi';
import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isEditable: {
        type: Boolean,
        required: false,
        default: true,
    },
    color: {
        id: String,
        name: String,
        code: String,
    },
    icon: {
        id: String,
        name: String,
        symbol: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export const schemaCreateCategory = Joi.object({
    name: Joi.string().min(1).required(),
    isEditable: Joi.boolean().optional(),
    color: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        code: Joi.string().required(),
    }).optional(),
    icon: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        symbol: Joi.string().required(),
    }).optional(),
});

export const schemaEditCategory = Joi.object({
    name: Joi.string().min(1).optional(),
    color: Joi.object({
        id: Joi.string(),
        name: Joi.string().min(1),
        code: Joi.string(),
    }).optional(),
    icon: Joi.object({
        id: Joi.string(),
        name: Joi.string().min(1),
        symbol: Joi.string(),
    }).optional(),
    isEditable: Joi.boolean().optional(),
})
    .or('name', 'color', 'icon', 'isEditable')
    .unknown(false);

const Category = mongoose.model('Category', categorySchema);

export default Category;
