import { React, useState, useEffect } from "react";
import './App.css';
import Login from './pages/Login.js';
import NavBar from "./components/NavBar.js";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("http://localhost:5555/session")
    .then((r) => {
      if (r.ok) {
        return r.json(); // parse response body as JSON
      }
      throw new Error('Failed to fetch user session');
    })
    .then((userData) => {
      setUser(userData); // update user state with fetched user data
    })
    .catch((error) => {
      console.error('Error fetching user session:', error);
    });
  }, []);

  function handleLogout() {
    fetch('http://localhost:5555/logout')
    .then(r => setUser(null));
  }

  return (
    <div>
      <NavBar user={user} handleLogout={handleLogout}/>
      {user ? (
      <></>
       ) : (
      <>
      <Login user={user} onLogin={setUser}/>
      </>
       )}
    </div>
  )
}

export default App;
