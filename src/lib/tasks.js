import { Tasks } from "./mongodb";

export const getAllTasks = async () => {
  const tasks = await (await Tasks()).find({}).toArray();
  return tasks;
};

export const createTask = async (newTask) => {
  const task = await (await Tasks()).insertOne(newTask);
  return task;
};

export const getTasksByProjectId = async (id) => {
  const tasks = await (await Tasks()).find({project_id: id}).toArray();
  return tasks;
};