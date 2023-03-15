import { configureStore } from "@reduxjs/toolkit";

import { combineEpics, createEpicMiddleware } from "redux-observable";

import topSalesReducer from "../features/topSalesSlice";
import catalogReducer from "../features/catalogSlice";
import cartReducer from "../features/cartSlice";
import formReducer from "../features/formSlice";

import {
  categoriesEpic,
  topSalesEpic,
  categoryItemsEpic,
  nextItemsEpic,
  getSelectedItemEpic,
  changeSearchEpic,
  searchItemsEpic,
  setOrderEpic 
} from "../features/Epics/index";

const epic = combineEpics(
  topSalesEpic,
  categoriesEpic,
categoryItemsEpic,
  nextItemsEpic,
  getSelectedItemEpic,
  
  searchItemsEpic,
  setOrderEpic 
);
const epicMiddleware = createEpicMiddleware();

export default configureStore({
  reducer: {
    topSales: topSalesReducer,
    catalog: catalogReducer,
    cart: cartReducer,
    form: formReducer,
  
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(epic);
