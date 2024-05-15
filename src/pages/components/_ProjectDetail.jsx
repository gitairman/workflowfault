import { useEffect, useState } from 'react';
import ChatBoxSSE from './_ChatBoxSSE';
import GanttChart from './_GanttChart';
import TasksContainer from './_TasksContainer';

export default function ProjectDetail({ id }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  console.log('inside project detail', id);

  useEffect(() => {
    (async () => {
      const tasks = await getData('tasks');
      console.log(tasks);
      const users = await getData('users');
      console.log(users);

      setTasks(tasks);
      setUsers(users);
    })();
  }, []);

  const getData = async (dataType) => {
    console.log('inside getData');
    const response = await fetch(`/api/${dataType}/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  };

  return (
    <div className="h-[calc(100vh-72px)]">
      <div className="h-[calc(50vh-72px)] overflow-y-auto">
        <GanttChart tasks={tasks} />
      </div>
      <div className="flex justify-center h-[54vh] mt-[-50px]">
        <ChatBoxSSE projectId={id} />
        <TasksContainer users={users} tasks={tasks} />
      </div>
    </div>
  );
}
