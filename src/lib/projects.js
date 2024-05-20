import { Projects, Users } from './mongodb';
import { ObjectId } from 'mongodb';

export const getAllProjects = async () => {
  const projects = await (await Projects()).find({}).toArray();
  return projects;
};

export const getProjectById = async (projectId) => {
  var id = new ObjectId(projectId);
  const project = await (await Projects()).findOne({ _id: id });
  return project;
};

export const getProjectByUser = async (userEmail) => {
  const projects = await (await Projects())
    .find({ users: userEmail })
    .toArray();
  return projects;
};

export const createProject = async (newProject) => {
  const project = await (await Projects()).insertOne(newProject);
  const pId = project.insertedId.toString();
  const response = await (
    await Users()
  ).updateMany(
    { email: { $in: newProject.users } },
    { $push: { projects: pId } }
  );
  return project;
};

export const deleteProject = async (projectId) => {
  const id = new ObjectId(projectId);
  await (await Projects()).deleteOne({ _id: id });
  await (await Users()).updateMany({projects: {$in:[projectId]}}, {$pull: { projects: projectId }});
};

export const addMemberToProject = async(email, projectId) => {
  const id = new ObjectId(projectId);
  try {
    await (await Projects()).updateMany(
      {_id: id},
      {$push: {users: email}}
    );
    await (await Users()).updateMany(
      {email: email},
      {$push: { projects: projectId }}
    );
    return new Response({
      status: 200,
    })
  } catch (error) {
    console.error('Error adding member to project:', error)
    return error;
  }
}

export const removeMemberFromProject = async(email, projectId) => {
  const id = new ObjectId(projectId);
  try {
    await (await Projects()).updateMany(
      {_id: id},
      {$pull: {users: email}}
    );
    await (await Users()).updateMany(
      {email: email},
      {$pull: { projects: projectId }}
    );
    return new Response({
      status: 200,
    })
  } catch (error) {
    console.error('Error removing member to project:', error)
    return error;
  }
}