// src/pages/api/users.js

import { getTasksByProjectId } from "../../../../lib/tasks";


export const GET = async (req) => {
  console.log('inside get tasks by project id api')
  console.log(req);
  const id = req.params.projectId;
  console.log(id);
  const tasks = await getTasksByProjectId(id);
  console.log(tasks);
  if (!tasks) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return new Response(JSON.stringify(tasks), {
    status: 200,
  });
};
