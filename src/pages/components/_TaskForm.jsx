export default function TaskForm({ users=["Aaron", "Sophie", "Amrinder"], tasks, handleSubmit }) {
  const options = tasks.reduce((p, t) => [...p, t.name], []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <br />
      <input name="name" id="name" />
      <br />
      <label htmlFor="description">Description:</label>
      <br />
      <textarea name="description" id="description" />
      <br />
      <label htmlFor="start">start Date:</label>
      <br />
      <input name="start" id="start" />
      <br />
      <label htmlFor="end">End Date:</label>
      <br />
      <input name="end" id="end" />
      <br />
      <fieldset>
        <div>
          Priority: High{' '}
          <input type="radio" id="priority1" name="priority" value="1" />
          <label htmlFor="priority1"> 1 </label>
          <input
            type="radio"
            id="priority2"
            name="priority"
            value="2"
            defaultChecked
          />
          <label htmlFor="priority2"> 2 </label>
          <input type="radio" id="priority3" name="priority" value="3" />
          <label htmlFor="priority3"> 3 </label> Low
        </div>
      </fieldset>
      <label htmlFor="dependencies">Dependencies:</label>
      <select name="dependencies" id="dependencies">
        <option value="default">-----Select One-----</option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o}
          </option>
        ))}
      </select><br />
      <label htmlFor="assigned_to">Assigned To: </label>
      <select name="assigned_to" id="assigned_to">
        <option value="default">-----Select One-----</option>
        {users.map((u, i) => (
          <option key={i} value={u}>
            {u}
          </option>
        ))}
      </select>
      <br />
      <button>Submit</button>
    </form>
  );
}

  // {
  //   id: 'Task 1',
  //   name: 'Buy hosting',
  //   start: '2022-01-22',
  //   end: '2022-01-23',
  //   progress: 100,
  // },