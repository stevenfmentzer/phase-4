import React from 'react';
import { Card } from 'semantic-ui-react';

const IncomeCard = ({ income }) => {
  const { bank_account_id, pay_value, pay_freq } = income;

  const total_salary = pay_value * pay_freq

  return (
    <Card>
      <Card.Content>
        <Card.Header>${total_salary}</Card.Header>
        <Card.Meta>Income</Card.Meta>
        <Card.Description>
          <p>Bank Account ID: {bank_account_id}</p>
          <p>Pay Value: ${pay_value}</p>
          <p>Pay Periods/Month: {pay_freq}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default IncomeCard;