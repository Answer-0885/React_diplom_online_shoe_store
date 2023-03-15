import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AvailableSizes from "./AvailableSizes";
import Counter from "./Counter";
import CartButton from "./CartButton";
import {
  addProductToCart,
  refreshCart,
} from "../../features/cartSlice";


import { nanoid } from "nanoid";

const CardItemControlBlock = (selectedProduct) => {
  const [counter, setCounter] = useState(1);
  const [selectSize, setSelectSize] = useState(null);
 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, price, title } = selectedProduct;
  const productItem = {
    id: id,
    size: selectSize,
    price: price,
    title: title,
  };

  const cartItems = JSON.parse(localStorage.cart);
  const idx = cartItems.findIndex((elem) => elem.product.id === productItem.id && elem.product.size===productItem.size);

  const onClickInCart = (e) => {
    e.preventDefault();
    idx === -1
      ? dispatch(
          addProductToCart({
            item: {
              quantity: counter,
              product: productItem,
              allPrice: counter * productItem.price,
            },
          })
        )
      : dispatch(
          refreshCart({
            item: {
              id: productItem.id,
              quantity: counter,
              allPrice: counter * productItem.price,
            },
          })
        );
    navigate("/cart.html");
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <AvailableSizes
          key={nanoid()}
          arrSizes={selectedProduct.sizes}
          selectSize={selectSize}
          stateSelectSize={setSelectSize}
        />
        <p>
          Количество:{" "}
          <span className="btn-group btn-group-sm pl-2">
            <Counter
              key={nanoid()}
              quantity={counter}
              stateQuantity={setCounter}
              select={selectSize}
            />
          </span>
        </p>
      </div>

      <CartButton select={selectSize} onClick={onClickInCart} />
    </React.Fragment>
  );
};
export default CardItemControlBlock;
