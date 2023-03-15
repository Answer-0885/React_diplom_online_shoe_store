import React, { useState } from "react";

const Counter = ({ quantity, stateQuantity, select }) => {

  const handleClickIncrement = () => {
    if (quantity < 10 && select) stateQuantity(quantity + 1);
  };

  const handleClickDecrement = () => {
    if (quantity > 1 && select) stateQuantity(quantity - 1);
  };
  return (
    <React.Fragment>
      <button onClick={handleClickDecrement} className="btn btn-secondary">
        -
      </button>
      <span className="btn btn-outline-primary">{quantity}</span>
      <button onClick={handleClickIncrement} className="btn btn-secondary">
        +
      </button>
    </React.Fragment>
  );
};
export default Counter;
