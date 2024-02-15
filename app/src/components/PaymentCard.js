import React from 'react';
import { Card, Input } from 'semantic-ui-react';

const PaymentCard = ({ key, payment, onChange, paymentForm }) => {

  return (
    <Card>
      <Card.Content>
        <Card.Header>{`Payment ()`}</Card.Header>
        <Card.Meta>Payment</Card.Meta>
        <Card.Description>
          <p>Bank Account ID: {}</p>
          <p>Pay Date: {}</p>
          <p>
            Pay Value: 
            <Input
              type="number"
              name="pay_value"
              value={payment}
              onChange={onChange}
            />
          </p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default PaymentCard;