// src/pages/api/users.js

import { createTask, getAllTasks } from '../../../lib/tasks';

export const GET = async (req) => {
  // console.log(req);
  const tasks = await getAllTasks();
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

export const POST = async ({ request }) => {
  const newTask = await request.json();
  const task = await createTask(newTask);
  return new Response(JSON.stringify(task), {
    status: 200,
  });
};
