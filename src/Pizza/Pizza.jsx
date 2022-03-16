import React from 'react';
import './pizza.scss';
import Slices from './Slices/Slices';

const Pizza = ({ pizzaEatersCount, orderDetails }) => {
  return (
    <div className="pizza-container">
      <div className="pizza">
        {orderDetails.type === 'meat'}
        <Slices pizzaEatersCount={pizzaEatersCount} />
      </div>
    </div>
  );
};

export default Pizza;
