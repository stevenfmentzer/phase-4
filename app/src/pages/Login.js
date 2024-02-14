import { React, useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";


function Login({ user, onLogin, setEnterSite }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      -----
      {showLogin ? (
        <>
          <LoginForm user={user} onLogin={onLogin} setEnterSite={setEnterSite} />
          <div />
          <p>
            Don't have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm user={user} onLogin={onLogin} setEnterSite={setEnterSite} />
          <div />
          {!user &&
          <p>
            Already have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
          }
        </>
      )}
    </div>
  );
}

export default Login;