import { configureStore } from "@reduxjs/toolkit";

import favReducer from "./reducers/favSlice";

// configure store
const store = configureStore({
    reducer: {
        favs: favReducer
    }
});

export default store;