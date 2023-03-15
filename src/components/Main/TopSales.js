import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  topSalesRequest,

} from "../../features/topSalesSlice";
import Loader from "./Loader";
import CardProducts from "./Catalog/CardProducts";
import MessageBlock from "./MessageBlock";
import { nanoid } from "nanoid";

const TopSales = () => {
  const { topSales, loading, error } = useSelector((state) => state.topSales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(topSalesRequest());
  }, [dispatch]);

  const clickHandler = (event) => {
    event.preventDefault();
    dispatch(topSalesRequest());
  };
  return (
    <React.Fragment>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {error ? (
          <MessageBlock
            key={nanoid()}
            title={error.message + ": Ошибка запроса"}
            textButton={"Попробовать еще раз"}
            onClick={clickHandler}
          />
        ) : null}
        {loading && <Loader key={nanoid()} />}
        <div className="row">
          {!loading &&
            topSales.map((item) => (
              <div key={nanoid()} id={item.id} className="col-4">
                <CardProducts key={nanoid()} item={item} />
              </div>
            ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default TopSales;
