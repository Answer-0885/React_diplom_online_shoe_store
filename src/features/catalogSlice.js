import { createSlice } from "@reduxjs/toolkit";

const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    categories: [],
    selectedCategorie: 11,
    selectedProduct: null,
    items: [],
    offset: 0,
    status: null,
    loading: false,
    error: null,
  },
  reducers: {
    categorieRequest(state) {
      return { ...state, loading: true, error: null };
    },
    categorieSuccess(state, action) {
      const { categories } = action.payload;
      const allItem = [{ id: 11, title: "Все" }];
      const allCategores = [...allItem, ...categories];

      return {
        ...state,
        categories: allCategores,
        loading: false,
        error: null,
      };
    },

    categorieFailure(state, action) {
      const { error } = action.payload;
      const status = "finish";
      return { ...state, status, loading: false, error };
    },
    activateCategorie(state, action) {
      state.selectedCategorie = action.payload;
      state.offset = 0;
    },
    itemsCategorieRequest(state, action) {
      const id = action.payload.id ? action.payload.id : 11;
      const offset = action.payload.offset;
      const status = "active";

      return {
        ...state,
        items: [],
        status,
        offset,
        loading: true,
        error: null,
      };
    },
    itemsCategorieSuccess(state, action) {
      const { items } = action.payload;

      return { ...state, search: "", items, loading: false, error: null };
    },

    itemsCategorieFailure(state, action) {
      const { error } = action.payload;

      return { ...state, status:"failure",loading: false, error };
    },
   
    nextItemsCategorieRequest(state, action) {
      const { id, offset } = action.payload;

      const status = "active";

      return { ...state, offset, status, loading: true, error: null };
    },
    //
    nextItemsCategorieSuccess(state, action) {
      const { next } = action.payload;

      const copyState = state;
      const items = copyState.items.concat(next);
      const offset = !next.length ? 0 : copyState.offset;

      const status = offset === 0 && !next.length ? "finish" : "active";
      return {
        ...state,
        search: "",
        status,
        offset,
        items,
        loading: false,
        error: null,
      };
    },
    selectedItemRequest(state, action) {
      const { id } = action.payload;

      return { ...state, loading: true, error: null };
    },
    selectedItemSuccess(state, action) {
      const { item } = action.payload;

      return { ...state, selectedProduct: item, loading: false, error: null };
    },
  },
});

export const {
  categorieRequest,
  categorieSuccess,
  categorieFailure,
  activateCategorie,
  itemsCategorieRequest,
  itemsCategorieSuccess,
  itemsCategorieFailure,
  nextItemsCategorieRequest,
  nextItemsCategorieSuccess,
  selectedItemRequest,
  selectedItemSuccess,
} = catalogSlice.actions;

export default catalogSlice.reducer;
