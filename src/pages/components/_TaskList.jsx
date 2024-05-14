import { useState } from 'react';
import TaskDetails from './_TaskDetails';

export default function TaskList({ tasks, handleSubmit, handleShowNewTask }) {
  const [taskDetails, setTaskDetails] = useState(null);

  const handleClick = (task) => {
    const filtered = {
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
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 h-full">
            <div className="overflow-y-auto bg-white shadow-md rounded px-4 h-full flex flex-col justify-between">
              {!taskDetails ? (
                <table className="overflow-y-auto min-w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Task Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Start Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((t) => (
                      <tr
                        onClick={() => handleClick(t)}
                        key={t.id}
                        className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {t.name}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {t.start}
                        </td>
                        <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                          {t.end}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <TaskDetails task={taskDetails} handleClose={handleClose} />
              )}
              {!taskDetails && (
                <div className="py-4">
                  <button
                    onClick={() => handleShowNewTask(true)}
                    className="mx-auto bg-blue-400 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-40 h-10 rounded-lg">
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
