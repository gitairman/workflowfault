import { useEffect, useState } from 'react';
import TaskForm from './_TaskForm';

export default function GanttChart() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();

      setTasks(tasks);
      let ganttChart = new Gantt('#gantt', tasks, {});
    })();
  }, [newTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formData
      .entries()
      .reduce((a, [key, val]) => ({ ...a, [key]: val }), { progress: 0 });
    console.log(data);
    await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    e.target.reset();
    setNewTask(!newTask);
  };

  return (
    <>
      <div>
        <script src="node_modules/frappe-gantt/dist/frappe-gantt.min.js" />
        <link
          rel="stylesheet"
          href="node_modules/frappe-gantt/dist/frappe-gantt.min.css"
        />
        <svg id="gantt"></svg>
      </div>
      <TaskForm tasks={tasks} handleSubmit={handleSubmit} client:load />
    </>
  );
}
