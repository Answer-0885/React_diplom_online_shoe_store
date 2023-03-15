import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { activateCategorie, itemsCategorieRequest } from "../../../features/catalogSlice";
import { searchItemsRequest } from "../../../features/formSlice";
import CategoriesItem from "./CategoryItem";
import { nanoid } from "nanoid";

const Categories = () => {
  const { categories, selectedCategorie, offset } = useSelector(
    (state) => state.catalog
  );
  const { searchItems, search, status } = useSelector((state) => state.form);
  const location = useLocation();
  const dispatch = useDispatch();
  const searchStatus = location.pathname === "/catalog.html" ? status : null;
  const listCategories = [...categories];

  let selectId;

  const clickHandler = (id) => {
    selectId = id;

    if (selectId !== selectedCategorie) {
      dispatch(activateCategorie(id));

      dispatch(itemsCategorieRequest({ id: selectId, offset: 0 }));
    }

    !search && !searchItems.length && searchStatus !== "active"
      ? dispatch(
          itemsCategorieRequest({
            id: selectId,
            offset: selectId !== selectedCategorie ? 0 : offset,
          })
        )
      : dispatch(
          searchItemsRequest({
            search: search,
            offset: 0,
            categoryId: id === 11 ? 0 : id,
          })
        );
  };
  return (
    <React.Fragment>
      <ul className="catalog-categories nav justify-content-center">
        {listCategories.map((item) => (
          <CategoriesItem
            key={nanoid()}
            onClick={clickHandler}
            selectId={selectedCategorie}
            {...item}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Categories;
