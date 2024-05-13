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
    <div className="flex justify-center items-center h-screen">
      <div class="w-full max-w-xs">
        <form onSubmit={submitHandler} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Name" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input type="email" name="email" id="reg-email" placeholder="Email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="***********" id="reg-password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company</label>
          <input type="text" name="company" placeholder="Company" id="company" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
        </form>
      </div>
    </div>
  )
}