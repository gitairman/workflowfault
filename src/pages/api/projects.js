// src/pages/api/projects.js

import { createProject, getAllProjects } from "../../lib/projects";

export const GET = async () => {
  const projects = await getAllProjects();
  if (!projects) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(projects), {
    status: 200,
  });
};

export const POST = async ({ request }) => {
  const newProject = await request.json();
  const project = await createProject(newProject);
  return new Response(JSON.stringify(project), {
    status: 200,
  });
};