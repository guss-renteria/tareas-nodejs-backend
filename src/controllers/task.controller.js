import { getAllTasks, getTaskById, addTask, updTask, delTask } from '../services/task.services';

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        res.json(tasks);
    } catch (e) {
        next(e);
    }
}

export const getTask = async (req, res, next) => {
    const id = req.params.id;
    try {
        const task = await getTaskById(id);
        res.json(task);
    } catch (e) {
        next(e);
    }
}

export const postTask = async (req, res, next) => {
  const task = req.body;
  try {
    const response = await addTask(task);
    res.status(201).json(response);
  }catch(e) {
    next(e);
  }
}

export const putTask = async (req, res, next) => {
    const { id } = req.params;
    const task = req.body;
    try {
        await updTask(id, task);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        await delTask(id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
