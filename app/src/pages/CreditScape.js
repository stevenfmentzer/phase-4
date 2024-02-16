import React, {useState, useEffect } from "react";
import BillCard from '../components/BillCard';
import BankCard from '../components/BankCard';
import IncomeCard from '../components/IncomeCard';
import PaymentCard from '../components/PaymentCard';
import BillForm from "../components/BillForm";
import BankForm from "../components/BankForm";
import IncomeForm from "../components/IncomeForm";


function CreditScape({ user }){

    const [billList, setBillList] = useState([])
    const [bankList, setBankList] = useState([])
    const [incomeList, setIncomeList] = useState([])
    const [paymentList, setPaymentList] = useState([])
    const [showBillForm, setShowBillForm] = useState(false);
    const [showBankForm, setShowBankForm] = useState(false);
    const [showIncomeForm, setShowIncomeForm] = useState(false);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5555/bills/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(setBillList)}})
    .catch(error => {
    console.error('Error fetching bill list:', error)})
    }, [user.id, reload]);

    useEffect(() => {
        fetch(`http://localhost:5555/banks/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(setBankList)}})
    .catch(error => {
    console.error('Error fetching bank list:', error)})
    }, [user.id, reload]);

    useEffect(() => {
        fetch(`http://localhost:5555/incomes/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(setIncomeList)}})
    .catch(error => {
    console.error('Error fetching income list:', error)})
    }, [user.id, reload]);

    useEffect(() => {
        fetch(`http://localhost:5555/payments/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(data => {
            // Sort paymentList by pay_date
            const sortedPaymentList = data.sort((a, b) => new Date(a.pay_date) - new Date(b.pay_date));
            setPaymentList(sortedPaymentList)})}})
    .catch(error => {
    console.error('Error fetching income list:', error)})
    }, [user.id, reload]);

    ////////////////
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
        setReload(!reload)
  
        // IF USER REGISTRATION POST WAS SUCCESSFUL > LOGIN
  
        // IF BILL POST WAS SUCCESSFUL > SET BILLDATA
        if (endpoint.includes('bills')) {
          console.log("INSIDE BILLDATA SETTER")
          setBillData(responseData)
        }
      }
    } 
    catch (error) {
      console.error("Error:", error);
    }
    setShowBillForm(false);
    setShowBankForm(false);
    setShowIncomeForm(false);
    }///////////////



    function handleAddBillClick() {
      setShowBillForm(!showBillForm);
    }

    function handleAddBankClick() {
        setShowBankForm(!showBankForm);
    }

    function handleAddIncomeClick() {
        setShowIncomeForm(!showIncomeForm);
    }

    return (
      <>
          <div>CreditScape Main Body</div>
          <button color="secondary" onClick={handleAddBillClick}>
              Add Bill
          </button>
          <button color="secondary" onClick={handleAddBankClick}>
              Add Bank
          </button>
          <button color="secondary" onClick={handleAddIncomeClick}>
              Add Job
          </button>
  
          {showBillForm && <BillForm user={user} onSubmit={handleSubmit}  />}
          {showBankForm && <BankForm user={user} onSubmit={handleSubmit}  />}
          {showIncomeForm && <IncomeForm user={user} onSubmit={handleSubmit}  />}
          
          {/* Render billList */}
          <h2>Bills</h2>
          <div>
              {billList.map((bill, index) => (
                  <BillCard key={index} bill={bill} />
              ))}
          </div>
  
          {/* Render bankList */}
          <h2>Banks</h2>
          <div>
              {bankList.map((bank, index) => (
                  <BankCard key={index} bank={bank} />
              ))}
          </div>
  
          {/* Render incomeList */}
          <h2>Jobs</h2>
          <div>
              {incomeList.map((income, index) => (
                  <IncomeCard key={index} income={income} />
              ))}
          </div>
  
          {/* Render paymentList */}
          <h2>Planned Payments</h2>
          <div>
              {paymentList.map((payment, index) => (
                  <PaymentCard key={index} payment={payment.pay_value} paymentForm={payment} />
              ))}
          </div>
      </>
    )
}

export default CreditScape