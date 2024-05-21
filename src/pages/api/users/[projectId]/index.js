// src/pages/api/users.js

import { getUsersByProjectId } from '../../../../lib/users';

export const GET = async (req) => {
  const id = req.params.projectId;
  const users = await getUsersByProjectId(id);
  if (!users) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return new Response(JSON.stringify(users), {
    status: 200,
  });
};
