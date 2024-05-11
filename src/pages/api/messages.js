// src/pages/api/messages.js

import { createMessage, getAllMessages } from '../../lib/messages';

export const GET = async () => {
  const messages = await getAllMessages();
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

export const POST = async ({ request }) => {
  const newMsg = await request.json();
  const msg = await createMessage(newMsg);
  return new Response(JSON.stringify(msg), {
    status: 200,
  });
};
