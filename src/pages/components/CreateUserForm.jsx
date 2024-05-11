export default function CreateUserForm() {
  return (
    <div>
      <h1 class="text-2xl">Create new user:</h1>
      <form>
        <label for="name">Name</label>
        <input type="text" name="name" required/>
        <label for="email">Email</label>
        <input type="email" name="email" required/>
        <label for="password">Password</label>
        <input type="password" name="password" required/>
        <label for="company">Company</label>
        <input type="text" name="company" required/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}