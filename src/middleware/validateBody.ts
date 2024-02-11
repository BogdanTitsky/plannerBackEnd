import { NextFunction, Response } from 'express';
import HttpError from '../helpers/httpError';
import { AuthRequest } from './authenticate';
import Joi from 'joi';

export const validateBody = (schema: Joi.Schema) => {
    const func = (req: AuthRequest, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    };

    return func;
};
