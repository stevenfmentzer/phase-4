import { React, useState, useEffect } from "react";
import NavBar from "./components/NavBar.js";
import Login from './pages/Login.js';
import CreditScape from './pages/CreditScape.js';

function App() {
  const [user, setUser] = useState(null);
  const [enterSite, setEnterSite] = useState(false);

  useEffect(() => {
    // Check localStorage for JWT token
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // Send token to server to verify validity
      fetch("http://localhost:5555/session", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: authToken }) // Include token in the request body
      })
      .then((response) => {
        if (response.ok) {
          return response.json(); // parse response body as JSON
        }
        throw new Error('Failed to verify user session');
      })
      .then((userData) => {
        setUser(userData); // update user state with fetched user data
      })
      .catch((error) => {
        console.error('Error verifying user session:', error);
        // Clear invalid token from localStorage
        localStorage.removeItem('authToken');
      });
    }
  }, []);

  function handleLogout() {
    fetch('http://localhost:5555/logout')
    .then(r => setUser(null))
    setEnterSite(false)
  }

  return (
    <div>
      <NavBar user={user} handleLogout={handleLogout}/>
      {!enterSite &&
      <Login user={user} onLogin={setUser} setEnterSite={setEnterSite}/>
       }
       {user && enterSite &&
         <CreditScape user={user}/>
        }
    </div>
  )
}

export default App;
