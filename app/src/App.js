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
        r.json().then((user) => console.log(user));
      }
    });
  }, []);

  function handleLogout() {
    fetch('http://localhost:5555/logout')
    .then(r => setUser(null));
  }

  return (
    <div>
      <NavBar user={user} handleLogout={handleLogout}/>
      <Login user={user} onLogin={setUser}/>
    </div>
  );
}

export default App;
