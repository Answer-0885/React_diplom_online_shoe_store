import { createSlice } from "@reduxjs/toolkit";

const topSalesSlice = createSlice({
  name: "topSales",
  initialState: {
    topSales: [],
    loading: false,
    error: null,
  },
  reducers: {
    topSalesRequest(state) {
      return { ...state, loading: true, error: null };
    },
    topSalesSuccess(state, action) {
      const { topSales } = action.payload;

      topSales.map((elem) => {
        const title = elem.title.split(" ");

        elem.title =
          title.length > 4 ? title.slice(0, 2).join("") : title.join("");
        return elem;
      });

      return { ...state, topSales, loading: false, error: null };
    },
    topSalesFailure(state, action) {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    },
  },
});

export const { topSalesRequest, topSalesSuccess, topSalesFailure } =
  topSalesSlice.actions;

export default topSalesSlice.reducer;
