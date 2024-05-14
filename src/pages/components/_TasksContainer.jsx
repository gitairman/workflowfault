import { useState } from 'react';
import TaskForm from './_TaskForm';
import TaskList from './_TaskList';
import TaskDetails from './_TaskDetails';

export default function TasksContainer({ tasks, handleNewTask }) {
  const [showNewTask, setShowNewTask] = useState(false);
  const [task, setTask] = useState(null);

  return (
    <div>
      {!showNewTask && (
        <TaskList
          tasks={tasks}
          handleShowNewTask={setShowNewTask}
          handleShowDetails={setTask}
        />
      )}
      {showNewTask && (
        <TaskForm
          tasks={tasks}
          handleShowNewTask={setShowNewTask}
          handleSubmit={handleNewTask}
        />
      )}
    </div>
  );
}
