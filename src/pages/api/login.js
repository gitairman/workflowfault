import { loginUser, generateSessionToken } from "../../lib/users";


export const POST = async ({ request, cookies }) => {
  const {email, password} = await request.json();
  const user = await loginUser(email, password);
  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid email or password." }), {
      status: 404,
    });
  }
  const token = generateSessionToken(user);

  cookies.set("session_id", token, {
    httpOnly: true,
    path: "/", // Adjust path as needed
    maxAge: 3600, // Adjust max age as needed (e.g., 1 hour)
    sameSite: "Strict", // Adjust sameSite policy as needed
    secure: true, // Set to true if serving over HTTPS
  });

  return new Response(JSON.stringify({token, user}), {
    status: 200,
  });
};