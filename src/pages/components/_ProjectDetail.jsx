import { useEffect, useState } from 'react';
import ChatBoxSSE from './_ChatBoxSSE';
import GanttChart from './_GanttChart';
import TasksContainer from './_TasksContainer';

export default function ProjectDetail({ id }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  console.log('inside project detail', id);

  useEffect(() => {
    (async () => {
      const tasks = await getData('tasks');
      console.log(tasks);
      const users = await getData('users');
      console.log(users);
      // const messages = await getData('messages');
      // console.log(messages);

      setTasks(tasks);
      // setUsers(users);
      // setMessages(messages);
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
        <ChatBoxSSE users={users} projectId={id} />
        <TasksContainer tasks={tasks} users={users} />
      </div>
    </div>
  );
}
