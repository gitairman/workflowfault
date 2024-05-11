import { loginUser } from "../../lib/users";

export const POST = async ({ request }) => {
  const {email, password} = await request.json();
  const user = await loginUser(email, password);
  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid email or password." }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(user), {
    status: 200,
  });
};