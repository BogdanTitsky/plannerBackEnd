import {
    createTask,
    deleteTask,
    editTask,
    getAllCompletedTasks,
    getAllTasks,
    getAllTasksByCategory,
    getTasksForToday,
    // toggleTaskStatus,
} from '../controllers/task.controller';
import ctrlWrapper from '../helpers/ctrlWrapper';
import { authenticationMiddleware } from '../middleware/authenticate';
import express from 'express';
import { validateBody } from '../middleware/validateBody';
import { schemaCreateTask, schemaEditTask } from '../models/task-model';
const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleware);

taskRoutes.route('/').get(ctrlWrapper(getAllTasks));
taskRoutes.route('/by-category/:id').get(ctrlWrapper(getAllTasksByCategory));
taskRoutes.route('/by-completion').get(ctrlWrapper(getAllCompletedTasks));
taskRoutes.route('/today').get(ctrlWrapper(getTasksForToday));

taskRoutes.route('/create').post(validateBody(schemaCreateTask), ctrlWrapper(createTask));
taskRoutes.route('/edit/:id').put(validateBody(schemaEditTask), ctrlWrapper(editTask));
taskRoutes.route('/delete/:id').delete(ctrlWrapper(deleteTask));

export default taskRoutes;
