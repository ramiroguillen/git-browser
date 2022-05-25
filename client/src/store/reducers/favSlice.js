import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: []
};

const favSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        getFav: ({ favorites }) => {
            // favorites = JSON.parse(localStorage.getItem("favorites"));
        },
        addFav: ({ favorites }, { payload }) => {
            const added = favorites.find(fav => fav.id === payload.id);
            if (!added) {
                favorites = favorites.push(payload);
                // localStorage.setItem("favorites", JSON.stringify(favorites));
            }
        },
        delFav: ({ favorites }, { payload }) => {
            favorites = favorites.filter(fav => fav.id !== payload.id);
            // localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }
});

export const { getFav, addFav, delFav } = favSlice.actions;

export default favSlice.reducer;