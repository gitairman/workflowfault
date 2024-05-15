import { useEffect, useState } from 'react';
import ChatBoxSSE from './_ChatBoxSSE';
import GanttChart from './_GanttChart';
import TasksContainer from './_TasksContainer';

export default function ProjectDetail({ id }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
    await getAndSet('tasks', setTasks);
    await getAndSet('users', setUsers);
    })();
  }, []);

  const getAndSet = async (dataType, cb) => {
    const response = await fetch(`/api/${dataType}/${id}`);
    const data = await response.json();
    cb(data);
  };

    const handleNewTask = async (e, sD, eD) => {
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
          start: sD.toISOString().slice(0, 10),
          end: eD.toISOString().slice(0, 10),
          project_id: id
        }
      );
      await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      e.target.reset();
      getAndSet('tasks', setTasks);
    };

  return (
    <div className="h-[calc(100vh-72px)]">
      <div className="h-[calc(50vh-72px)] overflow-y-auto">
        <GanttChart tasks={tasks} />
      </div>
      <div className="flex justify-center h-[54vh] mt-[-50px]">
        <ChatBoxSSE projectId={id} />
        <TasksContainer users={users} tasks={tasks} handleNewTask={handleNewTask}/>
      </div>
    </div>
  );
}
