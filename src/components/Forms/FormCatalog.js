import React from "react";
import { useDispatch } from "react-redux";
import {
    clearForm,
    inputValue,
    searchItemsRequest,
  } from "../../features/formSlice";

const FormCatalog = ({ value, categoryId, formError, error }) => {
    const dispatch = useDispatch();
  
    let output;
  
    const onSubmitForm = (event) => {
      event.preventDefault();
      const category= categoryId=== 11 ? 0 : categoryId;
    
  
      if (output !== value)
        dispatch(
          inputValue({
            search: output,
            offset:0,
            categoryId: category,
          })
        );
      error || formError || !output
        ? dispatch(clearForm())
        : dispatch(
            searchItemsRequest({
              search: output,
              offset:0,
              categoryId: category,
            })
          );
      output = "";
    };
  
    const handleChange = (event) => {
      event.preventDefault();
      output = event.target.value;
    };
  
    return (
      <React.Fragment>
        <form className="catalog-search-form form-inline" onSubmit={onSubmitForm}>
          <input
            className="form-control"
            placeholder="Поиск"
            defaultValue={value}
            onChange={handleChange}
          />
        </form>
      </React.Fragment>
    );
  };
  
  export default FormCatalog;