import { useState } from "react";
import DatePicker from 'react-datepicker';
import '/node_modules/react-datepicker/dist/react-datepicker.css';

export default function TaskForm({ users, tasks, handleSubmit, handleShowNewTask }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.log(startDate.toISOString().slice(0, 10))

  return (
    <div className="flex h-full">
      <div className="bg-white shadow-md rounded-lg max-w-full w-full h-full">
        <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center h-[50px]">
          <p className="text-lg font-semibold">New Task</p>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e, startDate, endDate)}
          className="px-4">
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
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label htmlFor="start">Start Date:</label>

          <div className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            {' '}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
            />
          </div>

          <label htmlFor="end">End Date:</label>

          <div className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy/MM/dd"
            />
          </div>

          <fieldset className="py-3">
            <div>
              Priority:{' '}
              <input
                type="radio"
                id="priority1"
                name="priority"
                value="high"
                className="ml-2"
              />
              <label htmlFor="priority1" className="mr-2">
                {' '}
                High{' '}
              </label>
              <input
                type="radio"
                id="priority2"
                name="priority"
                value="med"
                defaultChecked
              />
              <label htmlFor="priority2" className="mr-2">
                {' '}
                Medium{' '}
              </label>
              <input type="radio" id="priority3" name="priority" value="low" />
              <label htmlFor="priority3"> Low </label>
            </div>
          </fieldset>

          <label htmlFor="dependencies">Dependencies:</label>
          <select
            name="dependencies"
            id="dependencies"
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="default">-----Select One-----</option>
            {users.map((u, i) => (
              <option key={i} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="mx-auto bg-blue-400 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-40 h-10 rounded-lg my-6 mr-6">
            Submit
          </button>
          <button
            onClick={() => handleShowNewTask(false)}
            className="mx-auto bg-blue-400 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-40 h-10 rounded-lg">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}