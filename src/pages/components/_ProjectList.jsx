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

  const handleDeleteProject = async (projectId) => {
    let result = confirm("Are you sure you want to delete this project?")
    if (result) {
      try {
        let response = await fetch('/api/delete', {
          method: "POST",
          body: JSON.stringify(projectId)
        })
        if (response.ok) {
          setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="container mx-auto">
      <div className='flex justify-center max-w-full'>
        <h1 className='text-3xl'>Your Projects:</h1>
      </div>
      <ul className='flex max-w-full m-2'>
        {projects.map(project => (
          <div className="flex justify-center rounded bg-gray-200 space-between px-6 py-4 m-2" key={project._id}>
            <li>
              <a className="flex justify-center p-4"href={`projects/${project._id}`}>{project.title}</a>
              <p>Due date: {project.end}
                <button className="align-sub p-2 m-2"onClick={() => handleDeleteProject(project._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                    <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
                  </svg>
                </button>
              </p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}