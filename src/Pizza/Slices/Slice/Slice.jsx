import React from 'react';
import './slice.scss';

const Slice = ({ deg }) => {
  return (
    <div className="slice" style={{ transform: `rotate(${deg}deg)` }}></div>
  );
};

export default Slice;
