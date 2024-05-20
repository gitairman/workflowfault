import { addMemberToProject } from "../../../lib/projects";

export const POST = async ({ request }) => {
  const data = await request.json();
  const { email, projectId } = data;
  try {
    const response = await addMemberToProject(email, projectId)
    if (response) {
      return new Response(JSON.stringify({ message: 'Member added to project.' }), {
        status: 200,
      })
    } else {
      return new Response(JSON.stringify({ error: 'Failed to add member to project.'}), {
        status: 500,
      })
    }
  } catch (error) {
    return new Response(JSON.stringify( {error: 'Error adding a member'} ), {
      status: 500,
    });
  }
};