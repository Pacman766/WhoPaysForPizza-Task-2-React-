import React from 'react';
import './slices.scss';
import Slice from './Slice/Slice';
import { calculateDegrees } from './utiles';

const Slices = ({ pizzaEatersCount }) => {
  return (
    <div className="slices">
      {calculateDegrees(pizzaEatersCount).map((item) => (
        <Slice deg={item} key={item} />
      ))}
    </div>
  );
};

export default Slices;
