// UserForm.js
import React, { useState } from 'react';

function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, '/register');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="first_name" placeholder="first name" onChange={handleChange} />
      <input type="text" name="last_name" placeholder="last name" onChange={handleChange} />
      <input type="text" name="username" placeholder="username" onChange={handleChange} />
      <input type="text" name="password" placeholder="password" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;