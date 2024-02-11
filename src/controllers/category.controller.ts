import { Request, Response } from 'express';
import Category from '../models/category-model';
import { ICategory } from '../types';
import { AuthRequest } from '../middleware/authenticate';
import HttpError from '../helpers/httpError';

export const getAllCategories = async (req: AuthRequest, res: Response) => {
    const { user } = req;

    const categories = await Category.find({
        user,
    });
    if (!categories) {
        throw HttpError(401);
    }
    return res.json(categories);
};

export const createCategory = async (req: AuthRequest, res: Response) => {
    const { color, icon, name }: ICategory = req.body;
    const { user } = req;
    const category = await Category.create({
        color,
        icon,
        user,
        name,
    });
    if (!category) {
        throw HttpError(404, 'category is not created');
    }
    res.json(category);
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user;
    const result = await Category.findOneAndDelete({ _id: id, user: userId });
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json({ message: 'category deleted' });
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
    const { _id, color, icon, isEditable, name }: ICategory = req.body;
    const userId = req.user;
    const result = await Category.updateOne(
        { _id, user: userId },
        {
            $set: {
                name,
                color,
                icon,
                isEditable,
            },
        }
    );

    if (!result) {
        throw HttpError(401);
    }
    res.json({ message: 'category updated successfully' });
};
