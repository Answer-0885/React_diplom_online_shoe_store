import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateDelivery } from "../../../features/cartSlice";
import Cart from "./Cart";
import Order from "./Order";
import MessageBlock from "../MessageBlock";
import Loader from "../Loader";
import { Title } from "../../Atoms/Atoms";
import { nanoid } from "nanoid";

const CartBlock = () => {
  const { allItems, error, loading, deliveryStatus } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let messageText;
  if (deliveryStatus === "ok") {
    messageText = "Ваш заказ успешно отправлен. Благодарим за покупку!";
  } else if (error) {
    messageText = "Ошибка отправки заказа";
  }
  useEffect(() => {
    if (!allItems.length) localStorage.clear();
  }, [dispatch]);
  const onClickToCatalog = (event) => {
    event.preventDefault();

    dispatch(updateDelivery({ status: null }));
    navigate("/catalog.html");
  };
 
  return (
    <React.Fragment>
      {<Cart key={nanoid()} />}
      {loading && <Loader key={nanoid()} />}

      {!loading ? <Title key={nanoid()} text={messageText} /> : null}
      {!allItems.length && deliveryStatus === null ? (
        <MessageBlock
          key={nanoid()}
          title="Ваша корзина пуста"
          textButton={"Вернуться в каталог"}
          onClick={onClickToCatalog}
        />
      ) : null}

      {allItems.length > 0 && !loading ? <Order key={nanoid()} /> : null}
    </React.Fragment>
  );
};

export default CartBlock;
