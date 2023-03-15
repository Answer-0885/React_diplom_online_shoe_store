import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CardProducts from "../Catalog/CardProducts";
import{filtered} from "../../../utils/utils";
import { nanoid } from "nanoid";

const CatalogProduct = () => {
  const { items, selectedCategorie } = useSelector((state) => state.catalog);
  const {  searchItems, status } = useSelector((state) => state.form);

  const location = useLocation();

  const renderItems = !searchItems.length && status===null
    ? filtered(items, selectedCategorie)
    : filtered(searchItems, selectedCategorie);

    //условие для отрисовки при нахождении на главной
    
  return (
    <React.Fragment>
      <div className="row">
        {location.pathname === "/catalog.html" && renderItems
          ? renderItems.map((item) => (
              <div key={nanoid()} id={item.id} className="col-4 align-bottom">
                <CardProducts key={nanoid()} item={item} />
              </div>
            ))
          : items &&
            items.length > 0 &&
            items.map((item) => (
              <div key={nanoid()} id={item.id} className="col-4">
                <CardProducts key={nanoid()} item={item} />
              </div>
            ))}
      </div>
    </React.Fragment>
  );
};



export default CatalogProduct;


