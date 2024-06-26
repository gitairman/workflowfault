import { useState, useEffect } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userCompany, setUserCompany] = useState('');

  useEffect(() => {
    retrieveUsers();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = { tasks: []};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    data['users'] = Array.from(selectedUsers, user => user.email);
    try {
      await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });
      window.location.replace("/projects");
    } catch (error) {
      alert("Error creating your project.");
    }
  };
  

  const retrieveUsers = async () => {
    const email = localStorage.getItem('email');
    try {
      const response = await fetch("/api/users/company", {
        method: "POST",
        body: JSON.stringify({email: email})
      });
      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className='flex justify-center'>
    <button onClick={openModal} className='inline-block text-sm px-4 py-3 leading-none border rounded text-yellow-500 border-yellow-500 hover:border-yellow-500 hover:text-yellow-500 hover:bg-gray-200 mt-4 lg:mt-0'>+ Create New Project</button>
    </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-md">
            <div className="w-full max-w-s">
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label htmlFor="project-title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                  <input type="text" name="title" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                </div>
                <div className="mb-4">
                  <label htmlFor="project-description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                  <input type="text" name="description" id="project-description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                </div>  
                <div className="mb-4">
                  <label htmlFor="project-start" className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                  <input type="date" name="start" id="project-start" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                  <label htmlFor="project-end" className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                  <input type="date" name="end" id="project-end"className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                  <label htmlFor="users" className="block text-gray-700 text-sm font-bold mb-2">Select Members</label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="users" multiple onChange={(e) => setSelectedUsers(Array.from(e.target.selectedOptions, option => users.find(user => user.email === option.value)))}>
                    {users.map((user) => <option key={user._id} value={[user.email]}>{user.name}</option>)}
                  </select>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 m-1 rounded focus:outline-none focus:shadow-outline">Submit</button>
                  <button type="button" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 m-1 rounded focus:outline-none focus:shadow-outline" onClick={closeModal}>Cancel</button>
                </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}