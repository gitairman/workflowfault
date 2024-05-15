

export const addTask = async (e, sD, eD, project_id) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = formData.entries().reduce(
    (a, [key, val]) => ({
      ...a,
      [key]: val,
      ...(key === 'priority' ? { custom_class: val } : {}),
    }),
    {
      progress: 50,
      id: Date.now().toString(),
      start: sD.toISOString().slice(0, 10),
      end: eD.toISOString().slice(0, 10),
      project_id,
    }
  );
  await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  e.target.reset();
};

export const updateTask = async (id, data) => {
  console.log('inside updateTask', id, data);
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({id, data}),
    });
}

export const deleteTask = async (id) => {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
}