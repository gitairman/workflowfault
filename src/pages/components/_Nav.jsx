import { useState, useEffect } from "react"

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }
   
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setIsLoggedIn(true);
      setUserEmail(localStorage.getItem('email'));
    }
  }, []);
  
  const logout= () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    window.location.replace('/login');
  }

  return(
    <nav className="flex items-center justify-between flex-wrap bg-yellow-500 px-6 py-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/" className="text-[150%]" >WorkFlowVault</a>
      {isLoggedIn && <a href="/projects" className="ml-10 mt-4 lg:inline-block lg:mt-0 text-yellow-200 hover:text-white mr-4">My Projects</a>}
      {isLoggedIn && <a href="/users" className="ml-10 mt-4 lg:inline-block lg:mt-0 text-yellow-200 hover:text-white mr-4">User Directory</a>}
      </div>
      
      <div className="block lg:hidden">
        <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-yellow-200 border-yellow-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`${
          menuOpen ? "block" : "hidden"
        } w-fit block lg:flex lg:items-center lg:w-auto`} >
        <div className="w-fit text-sm ">
        {isLoggedIn ? (
        <span className="block mt-4 lg:inline-block lg:mt-0 text-yellow-200 hover:text-white mr-4">Logged in as {userEmail}</span>
      ) : (
        <>
        <a href="/login" className="block mt-4 lg:inline-block lg:mt-0 text-yellow-200 hover:text-white mr-4">Login</a>
        <a href="/create" className="block mt-4 lg:inline-block lg:mt-0 text-yellow-200 hover:text-white mr-4">Register</a>
        </>
      )}
      {isLoggedIn && <button onClick={logout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-yellow-500 hover:bg-white mt-4 lg:mt-0">Logout</button>}
        </div>
      </div>
    </nav>
  )
}