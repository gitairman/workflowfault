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
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-2">
        {projects.map(project => (
          <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow" key={project._id}>
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{project.title}</h3>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">Due date: {project.end}</p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"href={`projects/${project._id}`}>
                    <svg className="-5 w-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd"/>
                    </svg>
                    View Project
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 cursor-pointer" onClick={() => handleDeleteProject(project._id)}>
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
                    </svg>
                    Delete Project
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

