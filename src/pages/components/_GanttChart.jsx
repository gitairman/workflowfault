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
      const options = {
        bar_height: 25, // height of the task bar
        bar_corner_radius: 20, // border radius of bar
        arrow_curve: 10, // curve of the arrow
        padding: 20,
      };
      let ganttChart = new Gantt('#gantt', tasks, options);
    })();
  }, [newTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formData
      .entries()
      .reduce((a, [key, val]) => ({ ...a, [key]: val }), { progress: 50 });
    console.log(data);
    await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    e.target.reset();
    setNewTask(!newTask);
  };

  const styles = (
    <>
      <link
        rel="stylesheet"
        href="node_modules/frappe-gantt/dist/frappe-gantt.css"
      />
      <style>
        {` 
    .gantt .bar-label {
      font-size: 1.3em;
      }
    .gantt .bar {
      fill: grey;
    }
    svg {
      margin-bottom: -100px;
    }
      `}
      </style>
    </>
  );

  return (
    <>
      <div>
        <script src="node_modules/frappe-gantt/dist/frappe-gantt.min.js" />
        {styles}
        <svg id="gantt"></svg>
      </div>
      <TaskForm tasks={tasks} handleSubmit={handleSubmit} client:load />
    </>
  );
}
