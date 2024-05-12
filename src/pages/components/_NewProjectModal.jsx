import React, { useState, useEffect } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

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
    const data = {};
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
    try {
      const response = await fetch("/api/users");
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
      <button onClick={openModal}>Create New Project</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>Modal content goes here...</p>
            <form onSubmit={submitHandler}>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" required/>
              <label htmlFor="description">Description</label>
              <input type="text" name="description" required/>
              <label htmlFor="start-date">Start Date</label>
              <input type="date" name="start-date" />
              <label htmlFor="end">End Date</label>
              <input type="date" name="end"/>
              <label htmlFor="users">Select Members</label>
              <select name="users" multiple onChange={(e) => setSelectedUsers(Array.from(e.target.selectedOptions, option => users.find(user => user.email === option.value)))}>
                {users.map((user) => <option key={user.email} value={user.email}>{user.name}</option>)}
              </select>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}