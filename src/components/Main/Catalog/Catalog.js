import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  categorieRequest,
  itemsCategorieRequest,
  nextItemsCategorieRequest,
} from "../../../features/catalogSlice";
import {
  clearForm,
  searchItemsRequest,
} from "../../../features/formSlice";
import Loader from "../Loader";
import MessageBlock from "../MessageBlock";
import Categories from "./Categories";
import CatalogProduct from "./CatalogProduct";
import FormCatalog from "../../Forms/FormCatalog";
import { Button, Title } from "../../Atoms/Atoms";
import { nanoid } from "nanoid";

const Catalog = () => {
  const { selectedCategorie, items,status, loading, error } = useSelector(
    (state) => state.catalog
  );
  const formLoading = useSelector((state) => state.form.loading);

  const statusSearch = useSelector((state) => state.form.status);
  const formError = useSelector((state) => state.form.error);

  const { search, searchItems } = useSelector((state) => state.form);

  const dispatch = useDispatch();
  const location = useLocation();


  const categoryId = selectedCategorie === 11 ? 0 : selectedCategorie;
  console.log(status,452 )
  
  useEffect(() => {
    dispatch(categorieRequest());
    console.log(status, 114);
    getMore();
    if (formError) {
      dispatch(clearForm());
    }

    if (location.pathname.name === "/" || !items.length) {
      dispatch(itemsCategorieRequest({ id: categoryId, offset: items.length }));
    }
  }, [dispatch,status]);

  const onClickToFetch = () => {
    if (error) {
      dispatch(categorieRequest());

      dispatch(itemsCategorieRequest({ id: categoryId, offset: items.length }));
    }
  };
  const clickHandler = (event) => {
    event.preventDefault();

    if (statusSearch !== "active") {
      dispatch(
        nextItemsCategorieRequest({
          id: selectedCategorie,
          offset: items.length,
        })
      );
    } else {
      dispatch(
        searchItemsRequest({
          search: search,
          offset: searchItems.length,
          categoryId: categoryId,
        })
      );
    }
  };

  const getMore = () => {
    console.log(searchItems,'searchItems')
    if (location.pathname === "/" && items.length % 6 === 0 && status !== "finish") {
     
      return true;
    }
    if (search === "" && items.length % 6 === 0) {
      return true;
    } else if (search !== "" && searchItems.length % 6 === 0 && statusSearch !== "finish" ) {
 
      return true;
    }
  
    return false;
  };

  const formData = {
    value: search,
    categoryId: selectedCategorie,
    formError: formLoading,
    error: error,
  };

  return (
    <React.Fragment>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Categories key={nanoid()} />
        {location.pathname === "/catalog.html" && !error ? (
          <FormCatalog key={nanoid()} {...formData} />
        ) : null}

        {!error && <CatalogProduct key={nanoid()} />}
        {getMore() &&
          !loading &&
          !formLoading &&
          !formError &&
          !error && status!=="finish"&&
           (
            <Button
              key={nanoid()}
              text={"Загрузить ещё"}
              onClick={clickHandler}
            />
          )}
        {loading || formLoading ? <Loader key={nanoid()} /> : null}
        {error && !loading && !formLoading && (
          <MessageBlock
            key={nanoid()}
            title={error.message + ": Ошибка запроса каталога"}
            textButton="Попробовать еще раз"
            onClick={onClickToFetch}
          />
        )}
        {!formLoading &&
          !error &&
          !loading &&
          search !== "" &&
          !searchItems.length &&
          statusSearch === "finish" &&
          location.pathname !== "/" && (
            <Title
              key={nanoid()}
              text={`По запросу "${search}" в этой категории ничего нет`}
            />
          )}
      </section>
    </React.Fragment>
  );
};
export default Catalog;
