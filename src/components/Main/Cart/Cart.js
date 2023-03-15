import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../hook/LocalStorage";

import { removeProduct } from "../../../features/cartSlice";

import { nanoid } from "nanoid";

const Cart = () => {
  const { allItems } = useSelector((state) => state.cart);
  const [cart, setCart] = useLocalStorage("cart", []);
  const dispatch = useDispatch();

  useEffect(() => {
    setCart(allItems);
  }, [cart, setCart, allItems]);

  const onClickRemoveProduct = (id) => {
    const newStateCart = cart.filter((item) => item.product.id !== id);
    dispatch(removeProduct({ id: id }));
    setCart(newStateCart);
  };

  return (
    <React.Fragment>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>

        {cart.length > 0 && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {cart.length &&
                cart.map((item, i) => (
                  <tr key={nanoid()}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/catalog/:${item.product.id}.html`}>
                        {item.product.title}
                      </Link>
                    </td>
                    <td>{item.product.size}</td>
                    <td>{item.quantity}</td>                                 
                    <td>{item.product.price + " руб."}</td>
                    <td>{item.allPrice + " руб."}</td>
                    <td>
                      <button
                        onClick={() => onClickRemoveProduct(item.product.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="5" className="text-right">
                  Общая стоимость
                </td>
                <td>{getTotalPrice(allItems) + " руб"}.</td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
    </React.Fragment>
  );
};

export default Cart;

const getTotalPrice = (arr) => {
  return arr.reduce((sum, acc) => {
    return sum + acc.allPrice;
  }, 0);
};
