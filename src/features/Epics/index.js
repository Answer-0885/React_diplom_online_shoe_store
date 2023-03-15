import { ofType } from "redux-observable";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  map,
  switchMap,
  catchError,
  debounceTime,
  filter,
} from "rxjs/operators";
import {
  topSalesRequest,
  topSalesFailure,
  topSalesSuccess,
} from "../topSalesSlice";

import {
  categorieRequest,
  categorieSuccess,
  categorieFailure,
  itemsCategorieRequest,
  itemsCategorieSuccess,
  itemsCategorieFailure,
  nextItemsCategorieRequest,
  nextItemsCategorieSuccess,
  selectedItemRequest,
  selectedItemSuccess,
} from "../catalogSlice";

import {
  inputValue,
  searchItemsFailure,
  searchItemsRequest,
  searchItemsSuccess,
} from "../formSlice";

import {
  setOrderRequest,
  setOrderSuccess,
  setOrderFailure,
} from "../cartSlice";

export const topSalesEpic = (action$) => {
  return action$.pipe(
    ofType(topSalesRequest.type),
    debounceTime(2000),
    switchMap(() =>
      ajax.getJSON(`http://localhost:7070/api/top-sales`).pipe(
        map((response) => topSalesSuccess({ topSales: response })),
        catchError((error) => of(topSalesFailure({ error: error })))
      )
    )
  );
};

export const categoriesEpic = (action$) => {
  return action$.pipe(
    ofType(categorieRequest.type),
    debounceTime(2000),
    switchMap(() =>
      ajax.getJSON(`http://localhost:7070/api/categories`).pipe(
        map((response) => categorieSuccess({ categories: response })),
        catchError((error) => of(categorieFailure({ error: error })))
      )
    )
  );
};

export const categoryItemsEpic = (action$) => {
  return action$.pipe(
    ofType(itemsCategorieRequest.type),
    map((o) => o.payload),
    debounceTime(2000),
    switchMap((o) =>
      ajax
        .getJSON(
          o.id === 11
            ? `http://localhost:7070/api/items`
            : ` http://localhost:7070/api/items?categoryId=${o.id}`
        )
        .pipe(
          map((response) => itemsCategorieSuccess({ items: response })),
          catchError((error) => of(itemsCategorieFailure({ error: error })))
        )
    )
  );
};

export const nextItemsEpic = (action$) => {
  return action$.pipe(
    ofType(nextItemsCategorieRequest.type),
    map((o) => o.payload),
    debounceTime(2000),
    switchMap((o) =>
      ajax
        .getJSON(
          o.id === null || o.id === 11
            ? `http://localhost:7070/api/items/?offset=${o.offset}`
            : ` http://localhost:7070/api/items?categoryId=${o.id}&offset=${o.offset}`
        )
        .pipe(
          debounceTime(1000),
          map((response) => nextItemsCategorieSuccess({ next: response })),
          catchError((error) => of(itemsCategorieFailure({ error: error })))
        )
    )
  );
};

export const getSelectedItemEpic = (action$) => {
  return action$.pipe(
    ofType(selectedItemRequest.type),
    debounceTime(2000),
    map((o) => o.payload),
    switchMap((o) =>
      ajax.getJSON(`http://localhost:7070/api/items/${o.id}`).pipe(
        debounceTime(8000),
        map((response) => selectedItemSuccess({ item: response })),
        catchError((error) => of(categorieFailure({ error: error })))
      )
    )
  );
};

export const changeSearchEpic = (action$) => {
  return action$.pipe(
    debounceTime(2000),
    ofType(inputValue.type),
    map((o) => o.payload.search.trim()),
    filter((o) => o !== ""),
    map((o) => searchItemsRequest({ search: o })),
   
  );
};
//http://localhost:7070/api/items/?q=кро&offset=0&categoryId=0

export const searchItemsEpic = (action$) => {
  return action$.pipe(
    ofType(searchItemsRequest.type),
    debounceTime(3000),
    map((o) => o.payload),

    filter((o) => o.search !== ""),
    map(
      (o) =>
        new URLSearchParams({
          q: o.search,
          offset: o.offset,
          categoryId: o.categoryId,
        })
    ),
    switchMap((o) => ajax.getJSON(`http://localhost:7070/api/items/?${o}`)),

    map((o) => searchItemsSuccess({ items: o })),

    catchError((error) => of(searchItemsFailure({ error: error.message })))
  );
};

export const setOrderEpic = (action$) => {
  return action$.pipe(
    ofType(setOrderRequest.type),
    debounceTime(5000),
    map((o) => o.payload.order),
    switchMap((o) =>
      ajax({
        url: " http://localhost:7070/api/order",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(o),
      }).pipe(
        map((response) => setOrderSuccess({ response: response })),
        catchError((error) => of(setOrderFailure({ error: error })))
      )
    )
  );
};
