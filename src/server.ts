import express from 'express';
import connectToDatabase from './db';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/categories.routes';
import taskRoutes from './routes/tasks.routes';

const { PORT } = process.env;

const app = express();
app.use(express.json());

connectToDatabase();

app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server started with port ${PORT}`);
});
