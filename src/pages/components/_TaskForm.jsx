export default function TaskForm({ tasks, handleSubmit }) {
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
      <label htmlFor="dependencies">Dependencies:</label>
      <select name="dependencies" id="dependencies">
        {options.map((o, i) => (
          <option key={i} value={o}>{o}</option>
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