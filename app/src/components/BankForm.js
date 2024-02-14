// BankForm.js
import React, { useState } from 'react';

function BankForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    balance: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the endpoint as an argument to handleSubmit
    onSubmit(formData, 'accounts');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="account name" onChange={handleChange} />
      <input type="text" name="balance" placeholder="balance" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default BankForm;