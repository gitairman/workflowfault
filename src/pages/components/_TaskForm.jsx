export default function TaskForm({ users=["Aaron", "Sophie", "Amrinder"], tasks, handleSubmit }) {

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
          Priority: <input type="radio" id="priority1" name="priority" value="high" />
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
      <select name="dependencies" id="dependencies">
        <option value="default">-----Select One-----</option>
        {tasks.map((t) => (
          <option key={t._id} value={t.id}>
            {t.name}
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