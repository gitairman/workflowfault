// src/pages/api/chat.ts
import type { APIRoute } from 'astro';
import ChatController from '../../controllers/chat';

export const POST: APIRoute = async ({ request }) => {
  const { message, user , project_id} = await request.json();
  await ChatController.getInstance().addMessage(message, user, project_id );
  return new Response(null, { status: 204 });
};
