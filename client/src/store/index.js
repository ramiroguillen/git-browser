import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import favSlice from "./reducers/favorites.slice";

const reducer = combineReducers({
    favSlice
});

const store = configureStore({
    reducer
});

export default store;