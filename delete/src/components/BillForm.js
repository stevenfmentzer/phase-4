// BillForm.js
import React, { useState } from 'react';

// Bill Form takes in prop: onSubmit(formData, 'bill_api_endpoint')
function BillForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    lender_name: '',
    description: '',
    pay_date: '',
    bill_type: '',
    balance_init: '',
    balance_remain: '',
    min_pay_value: '',
    apr_rate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, '/bills');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="lender_name" placeholder="Lender Name" onChange={handleChange} />
      <input type="text" name="description" placeholder="Bill Description" onChange={handleChange} />
      <input type="date" name="pay_date" placeholder="Next Pay Date" onChange={handleChange} />
      <input type="number" name="balance_init" placeholder="Initial Balance Due" onChange={handleChange} />
      <input type="number" name="balance_remain" placeholder="Remaining Balace Due" onChange={handleChange} />
      <input type="number" name="min_pay_value" placeholder="Minimum Monthly Payment" onChange={handleChange} />
      <input type="number" name="apr_rate" placeholder="APR %" onChange={handleChange} />
      <select 
      id="bill_type_input"
      name="bill_type"
      onChange={handleChange}>
        <option value="Credit Card">Credit Card</option>
        <option value="Mortgage">Mortgage</option>
        <option value="Personal Loan">Personal Loan</option>
        <option value="School Loan">School Loan</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default BillForm;