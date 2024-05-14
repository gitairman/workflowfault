import { useEffect, useState } from 'react';
import ChatBoxSSE from './_ChatBoxSSE';
import GanttChart from './_GanttChart';
import TasksContainer from './_TasksContainer';

export default function ProjectDetail({ id }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  console.log('inside project detail');

  useEffect(() => {
    async () => {
      const tasks = await getData('tasks');
      const users = await getData('users');
      const messages = await getData('messages');

      setTasks(tasks);
      setUsers(users);
      setMessages(messages);
    };
  }, []);

  const getData = async (dataType) => {
    const response = await fetch(`/api/${dataType}/${id}`);
    const data = await response.json();
    return data;
  };

  return (
    <div className="h-[calc(100vh-72px)]">
      <div className="h-[calc(50vh-72px)] overflow-y-auto">
        <GanttChart tasks={tasks} />
      </div>
      <div className="flex justify-center h-[54vh] mt-[-50px]">
        <ChatBoxSSE users={users} messages={messages} />
        <TasksContainer tasks={tasks} users={users} />
      </div>
    </div>
  );
}
