import { Projects } from './mongodb';
import { ObjectId } from 'mongodb';

export const getAllProjects = async () => {
  const projects = await (await Projects()).find({}).toArray();
  return projects;
}

export const getProjectById = async (projectId) => {
  var id = new ObjectId(projectId);
  const project = await (await Projects()).findOne({ _id: id})
  return project
}

export const getProjectByUser = async(userEmail) => {
  const projects = await (await Projects()).find({ users: userEmail }).toArray();
  return projects;
}

export const createProject = async (newProject) => {
  const project = await (await Projects()).insertOne(newProject);
  return project;
};

export const deleteProject = async (projectId) => {
  var id = new ObjectId(projectId);
  await (await Projects()).deleteOne({ _id: id})
}