import React, { useState } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

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
              <label>Title</label>
              <input type="text" name="title" required/>
              <label>Description</label>
              <input type="text" name="description" required/>
              <label>Start Date</label>
              <input type="date" name="start-date" />
              <label>End Date</label>
              <input type="date" name="end"/>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}