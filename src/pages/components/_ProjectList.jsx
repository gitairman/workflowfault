import { useState, useEffect } from 'react';

export default function ProjectList() {
  const [userEmail, setUserEmail] = useState('');
  const [projects, setProjects] = useState([]);

  const fetchUserEmail = async () => {
    try {
      let response = await fetch('/api/userid');
      if (response.ok) {
        const userEmail = await response.json();
        setUserEmail(userEmail.userEmail);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      } 
    } catch (error) {
      console.error(error);
    } 
  }
  useEffect(() =>{
    fetchUserEmail()
  }, [])

const fetchProjects = async () => {
  try {
    let response = await fetch('/api/userid', {
      method: "POST",
      body: JSON.stringify(userEmail)
    })
    let projects = await response.json();
    setProjects(projects);
  } catch (error) {
    console.error(error)
  }}

  useEffect(() => {
    if(userEmail) {
      fetchProjects();
    }
  }, [userEmail])
  return (
    <div className="container mx-auto">
      <div className='flex justify-center max-w-full'>
        <h1 className='text-3xl'>Your Projects:</h1>
      </div>
      <ul className='flex max-w-full'>
        {projects.map(project => (
          <div className="flex justify-center rounded bg-gray-200 space-between px-6 py-4 m-2" key={project._id}>
            <li>
              <a className="flex justify-center p-4"href={`projects/${project._id}`}>{project.title}</a>
              <p>Due date: {project.end}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}