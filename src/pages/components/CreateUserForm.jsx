export default function CreateUserForm() {
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    try {
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
      });
      window.location.replace("/users");
    } catch (error) {
      alert("Error creating your account.");
    }
  };
  return (
    <div>
      <h1 className="text-2xl">Create new user:</h1>
      <form onSubmit={submitHandler}>
        <label>Name</label>
        <input type="text" name="name" required/>
        <label>Email</label>
        <input type="email" name="email" required/>
        <label>Age</label>
        <input type="number" name="age" required/>
        {/* <label>Company</label>
        <input type="text" name="company" required/> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}