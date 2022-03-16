import React from "react";
import './loadButton.scss';

const LoadButton = ({onClick, isLoading = false}) => {
  return <>
    <button onClick={onClick} disabled={isLoading}>Click To Load</button>
    <p></p>
    </>
}

export default LoadButton