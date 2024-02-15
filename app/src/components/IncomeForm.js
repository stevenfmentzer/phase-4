// IncomeForm.js
import React, { useState, useEffect } from 'react';

function IncomeForm({ user, onSubmit }) {

    const [bankAccounts, setBankAccounts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5555/banks/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(setBankAccounts)}})
    .catch(error => {
    console.error('Error fetching bank accounts:', error)})
    }, [user.id]);

  const [formData, setFormData] = useState({
    user_id: `${user.id}`,
    bank_account_id: '',
    pay_value: '',
    pay_freq: '1',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, `incomes/${user.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="pay_value" placeholder="Salary" onChange={handleChange} />
      <div>
          Pay Periods Per Month:
        <select id="pay_freq" name="pay_freq"onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <select
        name="bank_account_id"
        value={formData.bank_account_id}
        onChange={handleChange}
      >
        <option value="">Select Bank Account</option>
        {/* Map over bank accounts data to generate options */}
        {bankAccounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name} - {account.balance}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default IncomeForm;