import React, {useState, useEffect } from "react";
import BillCard from '../components/BillCard';
import BankCard from '../components/BankCard';
import IncomeCard from '../components/IncomeCard';
import PaymentCard from '../components/PaymentCard';


function CreditScape({ user }){

    const [billList, setBillList] = useState([])
    const [bankList, setBankList] = useState([])
    const [incomeList, setIncomeList] = useState([])
    const [paymentList, setPaymentList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5555/bills/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(setBillList)}})
    .catch(error => {
    console.error('Error fetching bill list:', error)})
    }, [user.id]);

    useEffect(() => {
        fetch(`http://localhost:5555/banks/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(setBankList)}})
    .catch(error => {
    console.error('Error fetching bank list:', error)})
    }, [user.id]);

    useEffect(() => {
        fetch(`http://localhost:5555/incomes/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(setIncomeList)}})
    .catch(error => {
    console.error('Error fetching income list:', error)})
    }, [user.id]);

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
    }, [user.id]);

    function handleClick(e){
      console.log("click")
    }

    return(
      <>
        <div>CreditScape Main Body</div>
        <button color="secondary" onClick={handleClick}>
              Add Bill
            </button>
            <button color="secondary" onClick={handleClick}>
              Add Bank
            </button>
            <button color="secondary" onClick={handleClick}>
              Add Job
            </button>
          <div>
        <div>
          {/* Render billList */}
          <h2>Bills</h2>
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
        </div>
      </>
    )
}

export default CreditScape