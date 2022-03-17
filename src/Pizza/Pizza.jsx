import React from 'react';
import './pizza.scss';
import Pieces from './Pieces/Pieces';

const Pizza = ({ pizzaEatersCount, orderDetails }) => {
  return (
    <div className="pizza-container">
      <div className="pizza">
        {orderDetails.type === 'meat'}
        <Pieces pizzaEatersCount={pizzaEatersCount} />
      </div>
    </div>
  );
};

export default Pizza;
