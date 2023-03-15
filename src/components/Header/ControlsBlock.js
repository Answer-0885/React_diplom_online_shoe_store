import React, { useState, useRef } from "react";
import FormSearch from "../Forms/FormSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  searchItemsRequest,
  clearForm,
} from "../../features/formSlice";

import { nanoid } from "nanoid";

const ControlsBlock = () => {
  const { allItems } = useSelector((state) => state.cart);
  const { error,selectedCategorie } = useSelector((state) => state.catalog);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValueRef = useRef();

  const amountCart = (arr) => {
    return arr.reduce((sum, acc) => {
      return sum + acc.quantity;
    }, 0);
  };
  const toggleVisible = () => {
    setIsVisible((prev) => !prev);
  };
  const clickHandler = () => {

    if (isVisible && searchValueRef.current.value.trim() !== "" && !error) {
      dispatch(
        searchItemsRequest({
          search: searchValueRef.current.value.trim(),
          offset: 0,
          categoryId: selectedCategorie === 11 ? 0 : selectedCategorie,
        })
      );
      navigate("catalog.html");
    } else {
      dispatch(clearForm());
    }
   

    toggleVisible();
  };
  return (
    <React.Fragment>
      <div className="header-controls-pics">
        <div
          data-id="search-expander"
          className="header-controls-pic header-controls-search"
          onClick={clickHandler}
        ></div>

        <div
          className="header-controls-pic header-controls-cart"
          onClick={() => navigate("/cart.html")}
        >
          {allItems && allItems.length > 0 ? (
            <div className="header-controls-cart-full">
              {amountCart(allItems)}
            </div>
          ) : null}
          <div className="header-controls-cart-menu"></div>
        </div>
      </div>
      <FormSearch key={nanoid()} isVisible={isVisible} ref={searchValueRef} />
    </React.Fragment>
  );
};

export default ControlsBlock;
