import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    search: "",
    searchItems: [],
    searchCategory: undefined,
    status: null,
    offset: 0,
    loading: false,
    error: null,
  },
  reducers: {
    inputValue: (state, action) => {
      const { search } = action.payload;
      const value = state.search === search ? state.search : search;
      return { ...state, search: value, status: null };
    },

    searchItemsRequest(state, action) {
      const { search, offset, categoryId } = action.payload;

      return {
        ...state,
        status: "active",
        offset,
        searchCategory: categoryId,
        loading: true,
        error: null,
      };
    },
    searchItemsFailure(state, action) {
      const { error } = action.payload;

      return {
        search: "",
        status: null,
        searchItems: [],
        searchCategory: undefined,
        offset: 0,
        status: null,
        loading: false,
        error,
      };
    },
    searchItemsSuccess(state, action) {
      const { items } = action.payload;
   
      const copyState = state;
      const offset = !items.length ? 0 : copyState.offset;

      let searchItems;
      if (offset === 0 && !copyState.searchItems.length) searchItems = items;
      else if (offset === 0 && copyState.searchItems.length > 0)
        searchItems = copyState.searchItems;
      else {
        searchItems= copyState.searchItems.concat(items);
      }

      const status = offset === 0 && !items.length ? "finish" : "active";
      return {
        ...state,
        searchItems,
        searchCategory: undefined,
        status,
        offset,
        loading: false,
        error: null,
      };
    },

    clearForm(state) {
      return {
        search: "",
        searchItems: [],
        searchCategory: undefined,
        offset: 0,
        status: null,
        loading: false,
        error: null,
      };
    },
  },
});

export const {
  inputValue,
  searchItemsFailure,
  searchItemsRequest,
  searchItemsSuccess,
  clearForm,
} = formSlice.actions;

export default formSlice.reducer;
