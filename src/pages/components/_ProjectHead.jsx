import { useState, useEffect } from "react";
import { getAndSet } from "./helper_functions/commonhelpers";

export default function ProjectHead({id, ...project}) {
  const [showEditMembers, setShowEditMembers] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const projectId = id;

  useEffect(() => {
    retrieveUsers();
    retrieveProjectUsers();
  }, [])

  
  const toggleShowEditMembers = () => {
    setShowEditMembers(!showEditMembers);
  }

  const addMember = async (e) => {
    e.preventDefault();
    const member = e.target[0].value;
    const id = projectId
    try {
      const response = await fetch("/api/projects/addmember", {
        method: "POST",
        body: JSON.stringify({email: member, projectId: id}),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.error);
      }
      window.location.replace(`/projects/${projectId}`)
    } catch (error) {
      alert("Error removing a member.");
    }
  }

  const removeMember = async (e) => {
    e.preventDefault();
    const member = e.target[0].value;
    const id = projectId
    try {
      const response = await fetch("/api/projects/removemember", {
        method: "POST",
        body: JSON.stringify({email: member, projectId: id}),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.error);
      }
      window.location.replace(`/projects/${projectId}`)
    } catch (error) {
      alert("Error removing a member.");
    }
  }

  const retrieveUsers = async () => {
    const email = localStorage.getItem('email');
    try {
      const response = await fetch("/api/users/company", {
        method: "POST",
        body: JSON.stringify({email: email})
      });
      if (response.ok) {
        const usersData = await response.json();
        setAllUsers(usersData);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveProjectUsers = async () => {
    try {
      const response = await fetch(`/api/users/${projectId}`);
      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const nonProjectMembers = allUsers.filter(user => !users.some(u => u.email === user.email));
  return(
    <div className="bg-gray-900 overflow-hidden shadow solid border">
    <div className="border-t border-gray-200 px-4 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-2 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-white">
                    Project name
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                    {project.title}
                </dd>
            </div>
            <div className="py-2 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-white">
                    Start Date
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                    {project.start}
                </dd>
            </div>
            <div className="py-2 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-white">
                    End date
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                    {project.end}
                </dd>
            </div>
            <div className="py-2 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-white">Members:</dt>
            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 flex justify-between items-center">
              <div>
                {project.users.map((user) => (
                  <a key={user} href={`/users/${user}`}>{user} </a>
                ))}
              </div>
              <button
                onClick={toggleShowEditMembers}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Edit members
              </button>
            </dd>
            </div>
        </dl>
    </div>
    {showEditMembers && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
                  <div className="relative bg-white p-6 rounded-md">
                    <div className="w-full max-w-s flex flex-col items-center">
                      <form className="max-w-sm mx-auto" onSubmit={addMember}>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium dark:text-black">Select members to add:</label>
                        <select multiple id="all_members_multiple" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {nonProjectMembers.map((u, i) => (
                            <option key={i} value={u.email}>
                            {u.name}
                            </option>
                            ))}
                          </select>
                        <button className="mb-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                          + Add Members
                        </button>
                      </form>
                      <form className="max-w-sm mx-auto" onSubmit={removeMember}>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium dark:text-black">Select members to remove:</label>
                          <select multiple id="current_members_multiple" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {users.map((u, i) => (
                            <option key={i} value={u.email}>
                            {u.name}
                            </option>
                            ))}
                          </select>
                        <button className="mb-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                          - Remove Member
                        </button>
                      </form>
                      <div className="p-2">
                        <button onClick={() => toggleShowEditMembers()} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                            Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div> 
              )}
</div>

  )
}