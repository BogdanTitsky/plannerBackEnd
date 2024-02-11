import { Request, Response } from 'express';
import Task from '../models/task-model';
import { AuthRequest } from '../middleware/authenticate';
import { ITask } from '../types';
import HttpError from '../helpers/httpError';

export const getAllTasks = async (req: AuthRequest, res: Response) => {
    const userId = req.user;
    const tasks = await Task.find({
        user: userId,
    });
    if (!tasks) HttpError(401);
    res.json(tasks);
};

export const getAllTasksByCategory = async (req: AuthRequest, res: Response) => {
    const userId = req.user;
    const { id } = req.params;

    const tasks = await Task.find({
        user: userId,
        categoryId: id,
    });

    if (!tasks) HttpError(401);
    res.json(tasks);
};
export const getAllCompletedTasks = async (req: AuthRequest, res: Response) => {
    const userId = req.user;

    const tasks = await Task.find({
        user: userId,
        isCompleted: true,
    });
    if (!tasks) HttpError(404);
    res.json(tasks);
};

export const getTasksForToday = async (req: AuthRequest, res: Response) => {
    const userId = req.user;
    const todaysDay = new Date();

    todaysDay.setUTCHours(0, 0, 0, 0);

    const tasks = await Task.find({
        user: userId,
        date: todaysDay.toISOString(),
    });
    if (!tasks) HttpError(404);
    res.json(tasks);
};

export const createTask = async (req: AuthRequest, res: Response) => {
    const userId = req.user;

    const { name, date, categoryId }: ITask = req.body;
    const task = await Task.create({
        name,
        date,
        categoryId,
        user: userId,
    });
    res.status(201).json(task);
};

export const editTask = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user;
    const { name, date, categoryId, isCompleted }: ITask = req.body;

    const task = await Task.findOneAndUpdate(
        {
            _id: id,
            user: userId,
        },
        {
            isCompleted,
            name,
            date,
            categoryId,
        }
    );

    if (!task) {
        throw HttpError(404, 'Not found');
    }
    res.status(201).json({ message: 'Task is updated' });
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user;
    const result = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json({ message: 'Task deleted' });
};
