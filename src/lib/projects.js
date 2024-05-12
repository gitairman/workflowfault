import { Projects } from './mongodb';
import { ObjectId } from 'mongodb';

export const getAllProjects = async () => {
  const projects = await (await Projects()).find({}).toArray();
  return projects;
}

export const getProjectById = async (projectId) => {
  var id = new ObjectId(projectId);
  console.log(projectId);
  const project = await (await Projects()).findOne({ _id: id})
  console.log(project);
  return project
}

export const createProject = async (newProject) => {
  const project = await (await Projects()).insertOne(newProject);
  return project;
};
