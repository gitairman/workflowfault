import { useState } from 'react';
import TaskForm from './_TaskForm';
import TaskList from './_TaskList';

export default function TasksContainer({ users, tasks, handleNewTask, handleTaskComplete, handleDeleteTask }) {
  const [showNewTask, setShowNewTask] = useState(false);
  const [task, setTask] = useState(null);

  return (
    <div className="w-full">
      {!showNewTask && (
        <TaskList
          tasks={tasks}
          handleShowNewTask={setShowNewTask}
          handleShowDetails={setTask}
          handleTaskComplete={handleTaskComplete}
          handleDeleteTask={handleDeleteTask}
        />
      )}
      {showNewTask && (
        <TaskForm
          users={users}
          tasks={tasks}
          handleShowNewTask={setShowNewTask}
          handleSubmit={handleNewTask}
        />
      )}
    </div>
  );
}
