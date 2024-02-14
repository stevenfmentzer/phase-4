// IncomeForm.js
import React, { useState, useEffect } from 'react';

function IncomeForm({ onSubmit }) {

    const [bankAccounts, setBankAccounts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5555/banks'
        .then((response) => {
          if (response.ok) {
            response.json()
            .then(setBankAccounts)
          }
        })
      )}, []);

  const [formData, setFormData] = useState({
    bank_account: '',
    pay_value: '',
    pay_freq: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, '/incomes');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="pay_value" placeholder="Income Amount" onChange={handleChange} />
      <option value="">Select Bank Account</option>
        {/* Map over bank accounts data to generate options */}
        {bankAccounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name} - {account.balance}
          </option>
        ))}
      <select id="pay_freq" name="pay_freq"onChange={handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default IncomeForm;