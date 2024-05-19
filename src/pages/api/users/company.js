// src/pages/api/users.js

import { getAllUsersByCompany } from "../../../lib/users";

export const POST = async ({request}) => {
  try { 
    const { email }  = await request.json()
    const users = await getAllUsersByCompany(email);
    if (!users) {
      return new Response(null, {
        status: 404,
        statusText: "Not found",
      });
    }

    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
       status: 500,
    });
  }
};
