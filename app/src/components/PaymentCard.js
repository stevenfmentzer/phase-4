import React from 'react';
import { Card } from 'semantic-ui-react';

const PaymentCard = ({ payment }) => {
    const { bank_account_id, pay_date, pay_value } = payment;
  
    return (
      <Card>
        <Card.Content>
          <Card.Header>{`Payment (${bank_account_id})`}</Card.Header>
          <Card.Meta>Payment</Card.Meta>
          <Card.Description>
            <p>Bank Account ID: {bank_account_id}</p>
            <p>Pay Date: {pay_date}</p>
            <p>Pay Value: {pay_value}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  };
  
  export default PaymentCard;