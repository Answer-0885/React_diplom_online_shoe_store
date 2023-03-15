import React from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const CardProducts = ({ item }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/catalog/:${item.id}.html`);
  };

  const marginBottom = "mb-3 ";
  return (
    <React.Fragment>
      <div key={nanoid()} className={marginBottom +"card"}>
        <img
          src={item.images[0]}
          className="card-img-top img-fluid "
          alt={item.title}
        />
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{item.price + " руб"}</p>
          <button className="btn btn-outline-primary" onClick={clickHandler}>
            Заказать
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardProducts;
