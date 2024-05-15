import { useEffect, useState } from 'react';
import ChatBoxSSE from './_ChatBoxSSE';
import GanttChart from './_GanttChart';
import TasksContainer from './_TasksContainer';

import { getAndSet } from './helper_functions/commonhelpers';
import {
  addTask,
  deleteTask,
  updateTask,
} from './helper_functions/taskhelpers';

export default function ProjectDetail({ id }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      await getAndSet(id, 'tasks', setTasks);
      await getAndSet(id, 'users', setUsers);
    })();
  }, []);

  const handleNewTask = async (e, startDate, endDate) => {
    await addTask(e, startDate, endDate, id);
    await getAndSet(id, 'tasks', setTasks);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    await getAndSet(id, 'tasks', setTasks);
  };

  const handleTaskComplete = async (taskId, data) => {
    console.log('inside handleTaskComplete', taskId, data)
    await updateTask(taskId, data);
    await getAndSet(id, 'tasks', setTasks);
  };

  return (
    <div className="h-[calc(100vh-72px)]">
      <div className="h-[calc(50vh-72px)] overflow-y-auto">
        <GanttChart tasks={tasks} />
      </div>
      <div className="flex justify-center h-[54vh] mt-[-50px]">
        <ChatBoxSSE projectId={id} />
        <TasksContainer
          users={users}
          tasks={tasks}
          handleNewTask={handleNewTask}
          handleDeleteTask={handleDeleteTask}
          handleTaskComplete={handleTaskComplete}
        />
      </div>
    </div>
  );
}
