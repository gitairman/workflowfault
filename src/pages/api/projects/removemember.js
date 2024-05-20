import { removeMemberFromProject } from "../../../lib/projects";

export const POST = async ({ request }) => {
  const data = await request.json();
  const { email, projectId } = data;
  try {
    const response = await removeMemberFromProject(email, projectId)
    if (response) {
      return new Response(JSON.stringify({ message: 'Member removed from project.' }),{
        status: 200,
      })
    } else {
      return new Response(JSON.stringify({ error: 'Failed to remove member from project.'}), {
        status: 500,
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({error: 'Error removing a member:'}, {
      status: 500,
    }))
  }
};