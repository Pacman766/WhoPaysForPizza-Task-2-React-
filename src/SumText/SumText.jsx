import React from "react";
import "./sumText.scss";

const Description = ({ allPeople, pizzaEatersCount }) => {
  return (
    <p className="discription">
      There will be {allPeople} at the party, {pizzaEatersCount} of them will eat pizza
    </p>
  );
};

export default Description;
