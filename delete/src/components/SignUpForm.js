import React, { useState } from "react";
import UserForm from "./UserForm";
import BillForm from "./BillForm";
import BankForm from "./BankForm";
import IncomeForm from "./IncomeForm";

function SignUpForm() {
  const [numSubmit, setNumSubmit] = useState(0);
  
  const handleSubmit = async (formData, endpoint) => {
    try {
      const response = await fetch(`http://localhost:5555/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const responseData = await response.json();

      // Handle response as needed
      // Handle response as needed
      // Handle response as needed
      // Handle response as needed

      console.log(responseData);
      //setData(responseData);
      // Increment numSubmit to display the next form
      setNumSubmit(numSubmit + 1)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {numSubmit === 1 && <UserForm onSubmit={handleSubmit} />}
      {numSubmit === 2 && <BillForm onSubmit={handleSubmit} />}
      {numSubmit === 3 && <BankForm onSubmit={handleSubmit} />}
      {numSubmit === 4 && <IncomeForm onSubmit={handleSubmit} />}
    </div>
  );
}

export default SignUpForm;