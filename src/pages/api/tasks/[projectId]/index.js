// src/pages/api/users.js

import {
  deleteTaskById,
  getTasksByProjectId,
  updateTaskById,
} from '../../../../lib/tasks';

export const GET = async (req) => {
  const id = req.params.projectId;
  const tasks = await getTasksByProjectId(id);
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

export const PATCH = async ({ request }) => {
  const { id, data } = await request.json();
  const res = await updateTaskById({ id }, data);
  if (res.modifiedCount === 0) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return new Response(JSON.stringify(res), {
    status: 200,
  });
};
export const DELETE = async (req) => {
  const res = await deleteTaskById(req.params.projectId);
  if (res.deletedCount === 0) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return new Response(JSON.stringify(res), {
    status: 200,
  });
};
