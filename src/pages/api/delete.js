import { deleteProject } from '../../lib/projects';

export const POST = async ({ request }) => {
  const projectId = await request.json();
  await deleteProject(projectId);
  return new Response('Project deleted',{
    status: 200,
  })
}