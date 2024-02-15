import { React, useState, useEffect } from "react";
import NavBar from "./components/NavBar.js";
import Login from './pages/Login.js';
import CreditScape from './pages/CreditScape.js';

function App() {
  const [user, setUser] = useState(null);
  const [enterSite, setEnterSite] = useState(false);

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
