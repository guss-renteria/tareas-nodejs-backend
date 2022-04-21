import fs from 'fs/promises';
import path from 'path';

const TASK_PATH = path.resolve(__dirname, '..', 'tasks.json');

const writeTasks = async (tasks) => {
  try {
    await fs.writeFile(TASK_PATH, JSON.stringify(tasks));
  }catch(e) {
    throw e;
  }
}

const getNextTask = async (tasks, task) => {
  return tasks.find(t => t.id === task.next);
}
const getPrevTask = async (tasks, task) => {
  return tasks.find(t => t.next === task.id);
}
const getFirstTask = async (tasks) => {
  const first = tasks.find(t => {
    for(let key in tasks) {
      if(t.id  === tasks[key].next) {
        return false;
      }
    }
    return true;
  });
  
  return first;
}
const getLastTask = async (tasks) => {
  console.log(tasks)
  return tasks.find(t => t.next === null);
}

//

export const getAllTasks = async () => {
  try {
    const task = await fs.readFile(TASK_PATH, 'utf8');
    return JSON.parse(task);
  }catch(e) {
    throw e;
  }
}

export const getTaskById = async (id) => {
  try {
    const tasks = await getAllTasks();
    const task = tasks.find(t => t.id === Number(id));
    return task;
  }catch(e) {
    throw e;
  }
}

export const addTask = async (task) => {
  try {
    const tasks = await getAllTasks();
    const last_task = await getLastTask(tasks);
    const new_id = (last_task ? Number(last_task.id) + 1 : 1);
    
    const new_task = {
      id: new_id,
      ...task
    }

    tasks.push(new_task);

    await writeTasks(tasks);
    if(last_task)
      await updTask(last_task.id, { next: new_id });
    return new_task;
  }catch(e) {
    throw e;
  }
}

export const updTask = async (id, task) => {
  const tasks = await getAllTasks();
  const id_task = tasks.findIndex(p => p.id === Number(id));

  const upd_task = {
    ...tasks[id_task],
    ...task
  }

  tasks[id_task] = upd_task;
  await writeTasks(tasks);
  return upd_task;
}

export const delTask = async (id) => {
  try {
    const tasks = await getAllTasks();
    const id_task = tasks.findIndex(p => p.id === Number(id));

    const prev_task = await getPrevTask(tasks, tasks[id_task]);
    if(prev_task)
      prev_task.next = tasks[id_task].next;

    tasks.splice(id_task, 1);
    await writeTasks(tasks);
    return true;
  }catch(e) {
    throw e;
  }
}
