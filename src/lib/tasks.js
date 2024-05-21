import { Tasks } from './mongodb';

export const getAllTasks = async () => {
  const tasks = await (await Tasks()).find({}).toArray();
  return tasks;
};

export const createTask = async (newTask) => {
  const  res = await (await Tasks()).insertOne(newTask);
  return res;
};

export const getTasksByProjectId = async (id) => {
  const tasks = await (await Tasks()).find({ project_id: id }).toArray();
  return tasks;
};

export const updateTaskById = async (id, data) => {
  const res = await (await Tasks()).updateOne(id, { $set: data });
  return res;
};

export const deleteTaskById = async (id) => {
  const res = await (await Tasks()).deleteOne({ id });
  return res;
}