import React from 'react';
import { Card } from 'semantic-ui-react';

const BankCard = ({ bank }) => {
  const { name, balance } = bank;

  return (
    <Card>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>Bank Account</Card.Meta>
        <Card.Description>
          <p>Balance: {balance}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default BankCard;