export default function LoginForm() {
  console.log("inside LoginForm");
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    try {
      let response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        window.location.replace("/users");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        window.location.replace("/login");
      }
    } catch (error) {
      alert("Error logging into your account.");
    }
  };
  return (
    <div>
      <h1 className="text-2xl">Login:</h1>
      <form onSubmit={submitHandler}>
        <label>Email</label>
        <input type="email" name="email" required/>
        <label>Password</label>
        <input type="password" name="password" required/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}