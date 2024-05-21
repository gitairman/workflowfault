export default function LoginForm() {
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
        const responseData = await response.json();
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('email', responseData.user.email)
        window.location.replace("/projects");
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
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="***************" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required/>
          </div>
          <div className="flex items-center justify-evenly">
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            <a href="/register" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</a>
          </div>
        </form>
      </div>
    </div>
  )
}