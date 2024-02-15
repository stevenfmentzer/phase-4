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
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5555/banks/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(setBankList)}})
    .catch(error => {
    console.error('Error fetching bank list:', error)})
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5555/incomes/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(setIncomeList)}})
    .catch(error => {
    console.error('Error fetching income list:', error)})
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5555/payments/${user.id}`)
            .then(response => {
        if (response.ok) {
            response.json().then(setPaymentList)}})
    .catch(error => {
    console.error('Error fetching income list:', error)})
    }, []);


    return(
      <>
        <div>CreditScape Main Body</div>
        <div>
          {/* Render incomeList */}
          <h2>Income List</h2>
          <div>
            {incomeList.map((income, index) => (
              <IncomeCard key={index} income={income} />
            ))}
          </div>

          {/* Render billList */}
          <h2>Bill List</h2>
          <div>
            {billList.map((bill, index) => (
              <BillCard key={index} bill={bill} />
            ))}
          </div>

          {/* Render bankList */}
          <h2>Bank List</h2>
          <div>
            {bankList.map((bank, index) => (
              <BankCard key={index} bank={bank} />
            ))}
          </div>

          {/* Render paymentList */}
          <h2>Payment List</h2>
          <div>
            {paymentList.map((payment, index) => (
              <PaymentCard key={index} payment={payment} />
            ))}
          </div>
        </div>
      </>
    )
}

export default CreditScape