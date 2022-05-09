import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import thunk from "redux-thunk";

import dressSlise from "./dressSlise";
import objectSlise from "./objectSlise";
import paginationSlise from "./paginationSlise";
import filtersSlise from "./filterSlise";

import cardSlise from "./cardSlise";

const reducers = combineReducers({
  dress: dressSlise,
  card: cardSlise,
  object: objectSlise,
  pagination: paginationSlise,
  filter: filtersSlise,
});

const persistConfig = {
  key: `root`,
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== `production`,
  middleware: [thunk],
});
export default store;
