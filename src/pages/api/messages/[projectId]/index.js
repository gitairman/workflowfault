// src/pages/api/users.js

import { getMessagesByProjectId } from '../../../../lib/messages';

export const GET = async (req) => {
  const id = req.params.projectId;
  const messages = await getMessagesByProjectId(id);
  if (!messages) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return new Response(JSON.stringify(messages), {
    status: 200,
  });
};