import React, { useState, useEffect } from 'react';
import { addMonths, format, parseISO } from 'date-fns';
import PaymentCard from '../components/PaymentCard';

function PaymentForm({ user, onSubmit, billData }) {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [payments, setPayments] = useState(null); // Initialize as null
  const [paymentForm, setPaymentForm] = useState(null)

  useEffect(() => {
    // Calculate payments when billData changes
    const numPayments = Math.ceil(billData.balance_remain / billData.min_pay_value);
    const lastPayment = billData.balance_remain % billData.min_pay_value || billData.min_pay_value;
    const paymentsArray = Array.from({ length: numPayments }, (_, index) =>
      index < numPayments - 1 ? billData.min_pay_value : lastPayment
    );
    setPayments(paymentsArray);
  }, [billData]);

  useEffect(() => {
    fetch(`http://localhost:5555/banks/${user.id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error fetching bank accounts');
      })
      .then(data => {
        setBankAccounts(data);
        console.log("Bank accounts data:", data);
      })
      .catch(error => {
        console.error('Error fetching bank accounts:', error);
      });
  }, [user.id]);
  
  useEffect(() => {
    if (bankAccounts.length > 0 && billData) {
      const paymentTemplate = {
        bill_id: `${billData.id}`,
        bill_name: `${billData.name}`,
        bank_account_id: `${bankAccounts[0].id}`,
        bank_account_name: `${bankAccounts[0].name}`,
        pay_date: `${billData.pay_date}`, 
        pay_value: '', 
      };
      // Set Template to Payment Form Data
      setPaymentForm(paymentTemplate);
    }
  }, [bankAccounts, billData]);

  //HANDLE PAYMENT VALUE CHANGE
  const handleChange = (e, index) => {
    const { value } = e.target;
    const newValue = Number(value);
    let updatedPayments = [...payments];
    let remainingBalance = billData.balance_remain;
  
    // Update the current payment value
    updatedPayments[index] = newValue;
  
    // Calculate the remaining balance after the change
    remainingBalance -= newValue;
  
    // Add or remove payments to match the remaining balance
    let i = index + 1;
    while (remainingBalance > 0 && i < updatedPayments.length) {
      const minPayment = Math.min(billData.min_pay_value, remainingBalance);
      updatedPayments[i] = minPayment;
      remainingBalance -= minPayment;
      i++;
    }
  
    // If there's still a remaining balance, add it to the last payment
    if (remainingBalance > 0) {
      updatedPayments[updatedPayments.length - 1] += remainingBalance;
    }
  
    setPayments(updatedPayments);
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    const selectedBankAccount = bankAccounts.find(account => account.id === value);
    if (selectedBankAccount) {
      setPaymentForm({
        ...paymentForm,
        bank_account_id: value,
        bank_account_name: selectedBankAccount.name
      });
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!payments || payments.length === 0) {
      console.log("No payments to submit");
      return;
    }
  
    // Parse the pay_date from paymentForm to a Date object
    const startDate = parseISO(paymentForm.pay_date);
  
    payments.forEach((payment, index) => {
      const nextMonthDate = addMonths(startDate, index); // Add index months to start date
  
      // Format the date as needed
      const formattedNextMonthDate = format(nextMonthDate, 'yyyy-MM-dd');
  
      const formData = {
        ...paymentForm,
        pay_value: payment,
        pay_date: formattedNextMonthDate // Update pay_date with the calculated date
      };
  
      console.log("Submitting payment form:");
      console.log(formData);
      console.log("Endpoint:");
      console.log(`payments/${user.id}`);
  
      onSubmit(formData, `payments/${user.id}`);
    });
  };

  return (
    <div>
    {paymentForm &&
      <select
        name="bank_account_id"
        value={paymentForm.bank_account_id}
        onChange={handleBankChange}
      >
        <option value="">Select Bank Account</option>
        {bankAccounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name} - {account.balance}
          </option>
        ))}
      </select>}
      {/* Check if payments is not null before rendering */}
      {paymentForm && payments && payments.map((payment, index) => (
        <PaymentCard key={index} payment={payment} onChange={(e) => handleChange(e, index)} paymentForm={paymentForm} />
      ))}
      <button onClick={handlePaymentSubmit}>Submit Payments</button>
    </div>
  );
}

export default PaymentForm;