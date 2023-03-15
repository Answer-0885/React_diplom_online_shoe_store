import { createSlice } from "@reduxjs/toolkit";

const cartData = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    item: [],
    allPrice: 0,
    allItems: cartData,
    deliveryStatus: null,
    loading: false,
    error: null,
  },
  reducers: {
    addProductToCart(state, action) {
      const { item } = action.payload;

      const allItems = [...state.allItems, item];
      state.allItems = allItems;
      state.deliveryStatus = null;
    },

    refreshCart(state, action) {
      if (!action.payload) state.deliveryStatus = null;

      const { item } = action.payload;

      if (item.id) {
        const idx = state.allItems.findIndex(
          (elem) => elem.product.id === item.id
        );

        if (idx !== -1) {
          state.allItems[idx].quantity += item.quantity;
          state.allItems[idx].allPrice += item.allPrice;
        }
      }
      state.deliveryStatus = null;
    },
    removeProduct(state, action) {
      const { id } = action.payload;
      const allItems = state.allItems.filter((elem) => elem.product.id !== id);
      return { ...state, allItems, loading: false, error: null };
    },

    setOrderRequest(state) {
      return { ...state, loading: true, error: null };
    },
    setOrderSuccess(state) {
      return {
        ...state,
        allItems: [],
        deliveryStatus: "ok",
        loading: false,
        error: null,
      };
    },
    setOrderFailure(state, action) {
      const { error } = action.payload;

      return { ...state, deliveryStatus: "failure", loading: false, error };
    },
    updateDelivery(state, action) {
      const { status } = action.payload;

      return { ...state, deliveryStatus: status };
    },
  },
});

export const {
  refreshCart,
  addProductToCart,
  removeProduct,
  setOrderRequest,
  setOrderSuccess,
  setOrderFailure,
  updateDelivery,
} = cartSlice.actions;

export default cartSlice.reducer;
