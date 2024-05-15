export default function TaskDetails({ task, handleClose }) {
  console.log(task);
  return (
    <>
      <table className="min-w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
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
          {Object.entries(task).map(([k, v], i) => (
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
          ))}
        </tbody>
      </table>
      <div className="py-4">
        <button
          onClick={() => handleClose(null)}
          className="mx-auto bg-yellow-400 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300 w-40 h-10 rounded-lg">
          Close
        </button>
      </div>
    </>
  );
}
