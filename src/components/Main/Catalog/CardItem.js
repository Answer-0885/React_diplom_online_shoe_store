import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useParams, } from "react-router-dom";
import { selectedItemRequest } from "../../../features/catalogSlice";
import CardItemControlBlock from "../../Control/CardItemControlBlock";
import Loader from "../Loader";
import MessageBlock from "../MessageBlock";
import { nanoid } from "nanoid";

const CardItem = () => {
  const { selectedProduct, loading, error } = useSelector(
    (state, shallowEqual) => state.catalog
  );
 
  const dispatch = useDispatch();
  const params = useParams();
 

  const id = Number(params.id.replace(":", "")); //некрасиво

  useEffect(() => {
    dispatch(selectedItemRequest({ id: id }));
  }, [dispatch, id]);

  const clickHandler = () => {
    dispatch(selectedItemRequest({ id: params.id }));
  }
  return (
    <React.Fragment>
      {loading && <Loader key={nanoid()} />}
      {!loading && selectedProduct ? (
        <section className="catalog-item">
          <h2 className="text-center">{selectedProduct.title}</h2>
          <div className="row">
            <div className="col-5">
              <img
                src={selectedProduct.images[0]}
                className="img-fluid"
                alt={selectedProduct.title}
              />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{selectedProduct.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{selectedProduct.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{selectedProduct.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{selectedProduct.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{selectedProduct.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{selectedProduct.reason}</td>
                  </tr>
                  <tr>
                    <td>Цена</td>
                    <td>{selectedProduct.price + " руб"}</td>
                  </tr>
                </tbody>
              </table>

              {selectedProduct && (
                <CardItemControlBlock key={nanoid()} {...selectedProduct} />
              )}
            </div>
          </div>
        </section>
      ) : null}
      {!loading && error && (
        <MessageBlock
          key={nanoid()}
          title={error.message + ": ошибка запроса"}
          textButton={"Попробовать еще раз"}
          onClick={clickHandler}
        />
      )}
    </React.Fragment>
  );
};

export default CardItem;
