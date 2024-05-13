import { useEffect, useState } from 'react';
import TaskForm from './_TaskForm';

export default function GanttChart() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);

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
    const data = formData.entries().reduce(
      (a, [key, val]) => ({
        ...a,
        [key]: val,
        ...(key === 'priority' ? { custom_class: val } : {}),
      }),
      {
        progress: 50,
        id: String(tasks.length + 1),
      }
    );
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
    /** bar and bar progress of the different color */
/* initial state */
.gantt .bar-wrapper.high .bar {
  fill: hsl(240, 50%, 57%);
}
.gantt .bar-wrapper.high .bar-progress {
  fill: hsl(240, 100%, 77%);
}
.gantt .bar-wrapper.med .bar {
  fill: hsl(347, 50%, 57%);
}
.gantt .bar-wrapper.med .bar-progress {
  fill: hsl(347, 100%, 77%);
}
.gantt .bar-wrapper.low .bar {
  fill: hsl(298, 50%, 57%);
}
.gantt .bar-wrapper.low .bar-progress {
  fill: hsl(298, 100%, 77%);
}

/* hover state */
.gantt .bar-wrapper.high:hover .bar-progress {
  fill: hsl(240, 100%, 77%);
}
.gantt .bar-wrapper.med:hover .bar-progress {
  fill: hsl(347, 100%, 77%);
}
.gantt .bar-wrapper.low:hover .bar-progress {
  fill: hsl(298, 100%, 77%);
}

/* active state */
.gantt .bar-wrapper.high.active .bar {
  fill: hsl(240, 50%, 57%);
}
.gantt .bar-wrapper.high.active .bar-progress {
  fill: hsl(240, 100%, 77%);
}
.gantt .bar-wrapper.med.active .bar {
  fill: hsl(347, 50%, 57%);
}
.gantt .bar-wrapper.med.active .bar-progress {
  fill: hsl(347, 100%, 77%);
}
.gantt .bar-wrapper.low.active .bar {
  fill: hsl(298, 50%, 57%);
}
.gantt .bar-wrapper.low.active .bar-progress {
  fill: hsl(298, 100%, 77%);
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
      <div className="mx-auto flex flex-col w-fit">
      {showTaskForm && (
        <TaskForm tasks={tasks} handleSubmit={handleSubmit} client:load />
      )}
      <button onClick={() => setShowTaskForm(!showTaskForm)} className="mx-auto bg-blue-400 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-40 h-10 rounded-xl">
        {showTaskForm ? 'Cancel' : 'New Task'}
      </button>
      </div>
    </>
  );
}
