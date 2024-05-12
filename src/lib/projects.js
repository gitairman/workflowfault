import { Projects } from './mongodb';

export const getAllProjects = async () => {
  const projects = await (await Projects()).find({}).toArray();
  return projects;
}

export const createProject = async (newProject) => {
  const project = await (await Projects()).insertOne(newProject);
  return project;
};