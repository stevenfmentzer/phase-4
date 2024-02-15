import React from 'react';
import { Card } from 'semantic-ui-react';

const BillCard = ({ bill }) => {
  const {
    name,
    lender_name,
    description,
    pay_date,
    bill_type,
    balance_init,
    balance_remain,
    min_pay_value,
    apr_rate,
  } = bill;

  return (
    <Card>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{bill_type}</Card.Meta>
        <Card.Description>
          <p>Lender: {lender_name}</p>
          <p>Description: {description}</p>
          <p>Pay Date: {pay_date}</p>
          <p>Initial Balance: {balance_init}</p>
          <p>Remaining Balance: {balance_remain}</p>
          <p>Minimum Payment: {min_pay_value}</p>
          <p>APR Rate: {apr_rate}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default BillCard;