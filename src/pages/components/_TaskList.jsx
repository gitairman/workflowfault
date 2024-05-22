import { useEffect, useRef, useState } from 'react';
import TaskDetails from './_TaskDetails';
import _ from 'lodash';

export default function TaskList({
  users,
  tasks,
  handleShowNewTask,
  handleDeleteTask,
  handleTaskComplete,
}) {
  const [taskDetails, setTaskDetails] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [allTasks, setAllTasks] = useState(tasks);
  const [filteredTasks, setFilteredTasks] = useState([]);

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

  const handleMyTasks = async () => {
    const userEmail = localStorage.getItem('email');
    const found = users.find((u) => u.email === userEmail);
    const filteredTasks = tasks.filter((t) => t.assigned_to === found.name);
    setFilteredTasks(filteredTasks);
    setIsFiltered(true);
  };

  const handleAllTasks = () => {
    setIsFiltered(false);
  };

  let renderedTasks;

  if (!_.isEqual(allTasks, tasks)) {
    setAllTasks(tasks);
    if (isFiltered) handleMyTasks();
  }

  if (isFiltered) renderedTasks = filteredTasks;
  else renderedTasks = allTasks;

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="overflow-x-auto h-full">
          <div className="inline-block min-w-full h-full">
            <div className="bg-gray-900 shadow-md rounded px-4 h-full flex flex-col justify-start">
              {!taskDetails ? (
                <>
                  <table className="min-w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
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
                        {renderedTasks.map((t) => (
                          <tr
                            onClick={() => handleClick(t)}
                            key={t.id}
                            className={`${
                              t.progress === 100 ? 'bg-green-700' : ''
                            } border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600 cursor-pointer`}>
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
                <div className="mt-auto flex justify-between">
                  <div className="py-4 mr-2">
                    <button
                      onClick={() => handleShowNewTask(true)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                      Create New Task
                    </button>
                  </div>
                  <div className="ml-auto py-4">
                    <button
                      onClick={() => handleMyTasks()}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                      My Tasks
                    </button>
                  </div>
                  <div className="ml-2 py-4">
                    <button
                      onClick={() => handleAllTasks()}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                      All Tasks
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
