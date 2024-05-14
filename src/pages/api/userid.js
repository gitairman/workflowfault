import { getProjectByUser } from '../../lib/projects';
import { getUserEmailFromCookie } from '../../lib/users';

export const GET = ({ cookies }) => {
  const userEmail = getUserEmailFromCookie(cookies);
  console.log(cookies);
  if (!userEmail) {
    return new Response(JSON.stringify({ error: "Unauthorized." }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ userEmail }), {
    status: 200,
  });
};

export const POST = async ({ request }) => {
  const userEmail = await request.json();
  const projects = await getProjectByUser(userEmail);
  console.log(projects);
  return new Response(JSON.stringify(projects), {
    status: 200,
  });
};