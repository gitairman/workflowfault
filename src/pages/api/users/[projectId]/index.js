// src/pages/api/users.js

import { getUsersByProjectId } from '../../../../lib/users';

export const GET = async (req) => {
  console.log('inside get tasks by project id api');
  console.log(req);
  const id = req.params.projectId;
  console.log(id);
  const users = await getUsersByProjectId(id);
  console.log(users);
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
