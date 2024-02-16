// BankForm.js
import React, { useState } from 'react';

function BankForm({ user, onSubmit }) {
  const [formData, setFormData] = useState({
    user_id: `${user.id}`,
    name: '',
    balance: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the endpoint as an argument to handleSubmit
    onSubmit(formData, 'banks');
  };
  
  return (
    <div>
      <h3>Add New Bank</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="account name" onChange={handleChange} />
        <input type="number" name="balance" placeholder="balance" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BankForm;