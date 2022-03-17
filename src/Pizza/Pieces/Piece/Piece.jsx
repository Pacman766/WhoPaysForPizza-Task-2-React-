import React from "react";
import './piece.scss';

const Piece = ({ deg }) => {
    return <div className='piece' style={{transform: `rotate(${deg}deg)`}}></div>
}

export default Piece;