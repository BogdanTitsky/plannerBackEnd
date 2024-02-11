import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../models/user-model';
import HttpError from '../helpers/httpError';

export interface AuthRequest extends Request {
    user: string;
}
const { SECRET_KEY } = process.env;
export const authenticationMiddleware = async (
    request: AuthRequest,
    response: Response,
    next: NextFunction
) => {
    try {
        const { authorization = '' } = request.headers;
        const [bearer, token] = authorization.split(' ');

        if (bearer !== 'Bearer') {
            next(HttpError(401));
        }

        if (!authorization) {
            return response.status(401).json({
                error: 'Authorization is required',
            });
        }
        const { _id } = jwt.verify(token, SECRET_KEY);

        const existingUser = await User.findOne({ _id });

        if (existingUser) {
            request.user = existingUser.id;
        }
        next();
    } catch (error) {
        console.log('error in authenticationMiddleware', error);
        next(HttpError(401));
    }
};
