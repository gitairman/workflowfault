import { useState, useEffect } from "react"

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
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
    <nav>
      <a href="/">Logo</a>
      {isLoggedIn ? (
        <span>Logged in as {userEmail}</span>
      ) : (
        <>
        <a href="/login">Login</a>
        <a href="/create">Register</a>
        </>
      )}
      {isLoggedIn && <a href="/projects">My Projects</a>}
      {isLoggedIn && <button onClick={logout}>Logout</button>}
    </nav>
  )
}