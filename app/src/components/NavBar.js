import { React, useState } from "react";
import SignUpForm from "./SignUpForm";


function NavBar({ user, handleLogout }) {
  
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
    <h1>
      CreditScape
    </h1>
     {user ? (
      <>
        <button to="/" onClick={handleLogout}>Logout</button>
      </>
    ) : (
      <>
        Not Logged In
      </>
   
    )}
  </div>
  )
}

export default NavBar;