import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskForm({ users=["Aaron", "Sophie", "Amrinder"], tasks, handleSubmit }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // console.log(`${startDate.getFullYear()}-${String(startDate.getMonth()).padStart(2, '0')}-${String(startDate.getDay()).padStart(2, '0')}`);
  console.log(startDate.toISOString().slice(0, 10))

  return (
    <div className="flex">
      <link
        rel="stylesheet"
        href="node_modules/react-datepicker/dist/react-datepicker.css"
        precedence="high"
      />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-semibold">New Task</h2>
        <form
          onSubmit={(e) => handleSubmit(e, startDate, endDate)}
          >
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            name="name"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label htmlFor="start">start Date:</label>

          <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            {' '}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
            />
          </div>

          <label htmlFor="end">End Date:</label>

          <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy/MM/dd"
            />
          </div>

          <fieldset>
            <div>
              Priority:{' '}
              <input type="radio" id="priority1" name="priority" value="high" />
              <label htmlFor="priority1"> High </label>
              <input
                type="radio"
                id="priority2"
                name="priority"
                value="med"
                defaultChecked
              />
              <label htmlFor="priority2"> Medium </label>
              <input type="radio" id="priority3" name="priority" value="low" />
              <label htmlFor="priority3"> Low </label>
            </div>
          </fieldset>

          <label htmlFor="dependencies">Dependencies:</label>
          <select
            name="dependencies"
            id="dependencies"
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="default">-----Select One-----</option>
            {tasks.map((t) => (
              <option key={t._id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <label htmlFor="assigned_to">Assigned To: </label>
          <select
            name="assigned_to"
            id="assigned_to"
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="default">-----Select One-----</option>
            {users.map((u, i) => (
              <option key={i} value={u}>
                {u}
              </option>
            ))}
          </select>

          <button className="mx-auto bg-blue-400 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-40 h-10 rounded-xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

  // {
  //   id: 'Task 1',
  //   name: 'Buy hosting',
  //   start: '2022-01-22',
  //   end: '2022-01-23',
  //   progress: 100,
  // },