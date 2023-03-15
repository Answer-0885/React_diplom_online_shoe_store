import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  inputValue,
  searchItemsRequest,
  clearForm,
} from "../../features/formSlice";

const FormSearch = React.forwardRef(({ isVisible }, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef();
  const { selectedCategorie, error } = useSelector((state) => state.catalog);

  const handleChange = (event) => {
    const { value } = event.target;

    searchRef.current = value;
    dispatch(inputValue({ search: event.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchRef.current && !error) {
      dispatch(
        searchItemsRequest({
          search: searchRef.current,
          offset: 0,
          categoryId: selectedCategorie === 11 ? 0 : selectedCategorie,
        })
      );
    } else {
      dispatch(clearForm());
    }
    navigate("/catalog.html");
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit}
        data-id="search-form"
        className={
          isVisible
            ? "header-controls-search-form form-inline"
            : "header-controls-search-form form-inline invisible"
        }
      >
        <input
          ref={ref}
          className="form-control"
          placeholder="Поиск"
          onChange={handleChange}
        />
      </form>
    </React.Fragment>
  );
});

export default FormSearch;

/**/
