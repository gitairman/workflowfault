import { useState } from 'react';

export default function TaskDetails({
  task,
  onCloseTask,
  onTaskComplete,
  onDeleteTask,
}) {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleClickCompleted = async () => {
    await onTaskComplete(task.id, { progress: 100, custom_class: "done" });
    setUpdatedTask({...task, Progress: '100%' })
  };
  const handleDeleteClick = async () => {
    await onDeleteTask(task.id);
    onCloseTask(null);
  }

  return (
    <>
      <table className="bg-green-700 min-w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
        <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
          <tr>
            <th
              scope="col"
              className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">
              Property
            </th>
            <th
              scope="col"
              className="border-e border-neutral-200 px-6 py-4 dark:border-white/10">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(updatedTask).map(([k, v], i) =>
            k === 'id' ? null : (
              <tr
                key={i}
                className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10 w-2/6">
                  {k}
                </td>
                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10 flex justify-start">
                  {v}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="py-4 mt-auto">
        <button
          onClick={() => onCloseTask(null)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 w-28">
          Close
        </button>
        <button
          onClick={handleClickCompleted}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-40 mx-4">
          Mark Complete
        </button>
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 w-28">
          Delete
        </button>
      </div>
    </>
  );
}
