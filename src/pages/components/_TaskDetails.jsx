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
              <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                {k}
              </td>
              <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                {v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => handleClose(null)}
        className="mx-auto bg-blue-400 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-40 h-10 rounded-xl">
        Close
      </button>
    </>
  );
}
