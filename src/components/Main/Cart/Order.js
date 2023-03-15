import React, { useRef, useEffect } from "react";
import { useLocalStorage } from "../../hook/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { setOrderRequest } from "../../../features/cartSlice";

const Order = () => {
  const { allItems } = useSelector((state) => state.cart);
  const [checked, setChecked] = useLocalStorage("orderFormCheck", false);
  const dispatch = useDispatch();

  const phoneRef = useRef();
  const addressRef = useRef();

  const formattedCart = (items) => {
    return items.map((elem) => {
      return (elem = {
        id: elem.product.id,
        price: elem.product.price,
        count: elem.quantity,
      });
    });
  };

  useEffect(() => {
    setChecked(false);
  }, [setChecked]);
  const clickHandler = (event) => {
    event.preventDefault();

    if (
      !checked ||
      phoneRef.current.value === "" ||
      addressRef.current.value === ""
    ) {
      return;
    }

    dispatch(
      setOrderRequest({
        order: {
          owner: {
            phone: phoneRef.current,
            address: addressRef.current,
          },
          items: formattedCart(allItems),
        },
      })
    );
  };

  const changeInput = (event) => {
    /**Без валидации адресов и телефонов */
    event.preventDefault();

    const { value } = event.target;

    event.target.id === "phone"
      ? (phoneRef.current = value)
      : (addressRef.current = value);
  };

  return (
    <React.Fragment>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div
          className="card"
          style={{ maxWidth: 30 + "rem", margin: "0 auto" }}
        >
          <form className="card-body">
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                ref={phoneRef}
                onChange={changeInput}
                className="form-control"
                id="phone"
                placeholder="Ваш телефон"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                ref={addressRef}
                onChange={changeInput}
                className="form-control"
                id="address"
                placeholder="Адрес доставки"
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
                onChange={(event) => setChecked(event.target.checked)}
              />
              <label className="form-check-label" htmlFor="agreement">
                Согласен с правилами доставки
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              onClick={clickHandler}
            >
              Оформить
            </button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Order;
