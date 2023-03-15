import React from "react";

/***/
const CartButton = ({ select, onClick }) => {
  return (
    <React.Fragment>
      {" "}
      <button onClick={onClick} disabled={!select} className="btn btn-danger btn-block btn-lg">
        В корзину
      </button>
    </React.Fragment>
  );
};

export default CartButton;
