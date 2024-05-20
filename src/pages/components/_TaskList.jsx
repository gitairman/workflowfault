import { useState } from 'react';
import TaskDetails from './_TaskDetails';

export default function TaskList({
  tasks,
  handleShowNewTask,
  handleDeleteTask,
  handleTaskComplete,
}) {
  const [taskDetails, setTaskDetails] = useState(null);

  const handleClick = (task) => {
    const filtered = {
      id: task.id,
      Name: task.name,
      Description: task.description,
      'Start Date': task.start,
      'End Date': task.end,
      Priority: task.priority,
      Progress: `${task.progress}%`,
      Dependencies: task.dependencies.map(
        (d) => tasks.find((t) => t.id === d)?.name || 'None'
      ),
      'Assigned To': task.assigned_to,
    };
    setTaskDetails(filtered);
  };

  const handleClose = () => {
    setTaskDetails(null);
  };
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="overflow-x-auto h-full">
          <div className="inline-block min-w-full h-full">
            <div className="bg-gray-900 shadow-md rounded px-4 h-full flex flex-col justify-start">
              {!taskDetails ? (
                <>
                  <table className="min-w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white mt-4">
                    <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                      <tr>
                        <th
                          scope="col"
                          className="w-2/6 py-4 whitespace-nowrap border-e border-neutral-200 dark:border-white/10">
                          Task Name
                        </th>
                        <th
                          scope="col"
                          className="w-2/6 py-4 whitespace-nowrap border-e border-neutral-200 dark:border-white/10">
                          Start Date
                        </th>
                        <th
                          scope="col"
                          className="w-2/6 py-4 whitespace-nowrap border-e border-neutral-200 dark:border-white/10">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                  </table>
                  <div className="overflow-y-auto">
                    <table className="min-w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white mt-2">
                      <tbody>
                        {tasks.map((t) => (
                          <tr
                            onClick={() => handleClick(t)}
                            key={t.id}
                            className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600 cursor-pointer">
                            <td className="w-2/6 whitespace-nowrap border-e border-neutral-200 py-4 font-medium dark:border-white/10">
                              {t.name}
                            </td>
                            <td className="w-2/6 whitespace-nowrap border-e border-neutral-200 py-4 font-medium dark:border-white/10">
                              {t.start}
                            </td>
                            <td className="w-2/6 whitespace-nowrap border-e border-neutral-200 py-4 font-medium dark:border-white/10">
                              {t.end}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <TaskDetails
                  task={taskDetails}
                  onCloseTask={handleClose}
                  onDeleteTask={handleDeleteTask}
                  onTaskComplete={handleTaskComplete}
                />
              )}
              {!taskDetails && (
                <div className="mt-auto py-4">
                  <button
                    onClick={() => handleShowNewTask(true)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                    Create New Task
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
