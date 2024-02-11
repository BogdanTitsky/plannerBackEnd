import express from 'express';
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory,
} from '../controllers/category.controller';
import { authenticationMiddleware } from '../middleware/authenticate';
import ctrlWrapper from '../helpers/ctrlWrapper';
import { validateBody } from '../middleware/validateBody';
import { schemaCreateCategory, schemaEditCategory } from '../models/category-model';

const categoryRoutes = express.Router();

categoryRoutes.use(authenticationMiddleware);

categoryRoutes.route('/').get(ctrlWrapper(getAllCategories));
categoryRoutes
    .route('/create')
    .post(validateBody(schemaCreateCategory), ctrlWrapper(createCategory));
categoryRoutes
    .route('/update/:id')
    .put(validateBody(schemaEditCategory), ctrlWrapper(updateCategory));
categoryRoutes.route('/delete/:id').delete(ctrlWrapper(deleteCategory));

export default categoryRoutes;
