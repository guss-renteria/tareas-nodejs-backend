import { Router } from 'express';
import { getTasks, getTask, postTask, putTask, deleteTask } from '../controllers/task.controller';

export const routes = Router();

routes.get('/tasks', getTasks);
routes.get('/task/:id', getTask);
routes.post('/tasks', postTask);
routes.put('/task/:id', putTask)
routes.delete('/task/:id', deleteTask);
