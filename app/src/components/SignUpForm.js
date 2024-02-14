import { React, useState } from "react";
import UserForm from "./UserForm";
import BillForm from "./BillForm";
import BankForm from "./BankForm";
import IncomeForm from "./IncomeForm";

function SignUpForm({ user, onLogin }) {
    console.log("SIGN UP FORM")
  const [numSubmit, setNumSubmit] = useState(0);
  
  const handleSubmit = async (formData, endpoint) => {
    console.log(formData)

    try {
      const response = await fetch(`http://localhost:5555/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(`SUCCESSFUL POST:}`);
        console.log(responseData)

        if (endpoint === "register") {
          console.log("RECIEVED NEW USER OBJECT:")
          console.log(responseData)
          const loginCredentials = {
            username: responseData.username,
            password: responseData.password
          };

          console.log("LOGIN CREDENTIALS:")
          console.log(loginCredentials)


          const loginData = await fetch("http://localhost:5555/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(loginCredentials)
          });

          if (loginData.ok) {
            const loginResponse = await loginData.json()
            onLogin(loginResponse)
            console.log(`LOGGED IN:`)
            console.log(loginResponse)
          }
        }
      }
      // Increment numSubmit to display the next form
      setNumSubmit(numSubmit + 1);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div>
      {numSubmit === 0 && <UserForm onSubmit={handleSubmit} />}
      {numSubmit === 1 && <BillForm user={user} onSubmit={handleSubmit} />}
      {numSubmit === 2 && <BankForm onSubmit={handleSubmit} />}
      {numSubmit === 3 && <IncomeForm onSubmit={handleSubmit} />}
    </div>
  );
}

export default SignUpForm;