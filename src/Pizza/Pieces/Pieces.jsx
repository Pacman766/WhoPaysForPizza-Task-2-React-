import React from 'react';
import './pieces.scss';
import { calculateDegrees } from './utiles';
import Piece from './Piece/Piece';

const Pieces = ({ pizzaEatersCount }) => {
  return (
    <div className="pieces">
      {calculateDegrees(pizzaEatersCount).map((item) => (
        <Piece deg={item} key={item} />
      ))}
    </div>
  );
};

export default Pieces;
