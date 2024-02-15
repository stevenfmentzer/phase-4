import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import BillForm from "./BillForm";
import BankForm from "./BankForm";
import IncomeForm from "./IncomeForm";
import PaymentForm from "./PaymentForm";

function SignUpForm({ user, onLogin, setEnterSite }) {
  console.log("SIGN UP FORM");
  const [numSubmit, setNumSubmit] = useState(0);
  const [billData, setBillData] = useState(null)

  const handleSubmit = async (formData, endpoint) => {
    console.log(formData);
  
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
        console.log(`SUCCESSFUL POST:`);
        console.log(responseData);
  
        // IF USER REGISTRATION POST WAS SUCCESSFUL > LOGIN
        if (endpoint === "register") {
          console.log("RECIEVED NEW USER OBJECT:");
          console.log(responseData);
          const loginCredentials = {
            username: formData.username,
            password: formData.password
          };
  
          console.log("LOGIN CREDENTIALS:");
          console.log(loginCredentials);
  
          const loginData = await fetch("http://localhost:5555/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(loginCredentials)
          });
  
          // IF LOGIN WAS SUCCESSFUL > SET USER
          if (loginData.ok) {
            const loginResponse = await loginData.json();
            onLogin(loginResponse);
            console.log(`LOGGED IN:`);
            console.log(loginResponse);
          }
        }
  
        // IF BILL POST WAS SUCCESSFUL > SET BILLDATA
        if (endpoint.includes('bills')) {
          console.log("INSIDE BILLDATA SETTER")
          setBillData(responseData)
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // Increment numSubmit to display the next form
    setNumSubmit(numSubmit + 1);
  };

  useEffect(() => {
    // Check if all forms have been submitted
    if (numSubmit === 5) {
      setEnterSite(true);
    }
  }, [numSubmit, setEnterSite]);

  return (
    <div>
      {numSubmit === 0 && <UserForm onSubmit={handleSubmit} />}
      {user && numSubmit === 1 && <BankForm user={user} onSubmit={handleSubmit} />}
      {user && numSubmit === 2 && <IncomeForm user={user} onSubmit={handleSubmit} />}
      {user && numSubmit === 3 && <BillForm user={user} onSubmit={handleSubmit} />}
      {user && numSubmit === 4 && <PaymentForm user={user} onSubmit={handleSubmit} billData={billData} />}
    </div>
  );
}

export default SignUpForm;