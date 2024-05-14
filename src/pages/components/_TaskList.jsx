export default function TaskList({tasks}) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
          <div className="overflow-hidden bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <table className="min-w-full border border-neutral-200 text-center text-sm font-light text-surface dark:border-white/10 dark:text-white">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th scope="col" class="px-6 py-4">
                    Task Name
                  </th>
                  <th scope="col" class="px-6 py-4">
                    Start Date
                  </th>
                  <th scope="col" class="px-6 py-4">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {t.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {t.start}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {t.end}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}