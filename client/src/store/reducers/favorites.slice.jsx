import { createSlice } from "@reduxjs/toolkit";

const favSliceInitialState = {
    favs: []
};

const favSlice = createSlice({
    name: "favorites",
    initialState: favSliceInitialState,
    reducer: {
        getFav: (state, action) => {
            // state.favs = action.payload;
            state.favs = JSON.parse(localStorage.getItem("favs"));
        },
        addFav: (state, action) => {
            let faved = false;
            state.favs.map(fav => fav === action.payload && (faved = true));
            if (!faved) {
                state.favs.push(action.payload);
                localStorage.setItem("favs", JSON.stringify(state.favs));
                return state.favs;
            }
        },
        delFav: (state, action) => {
            state.favs.filter(fav => fav !== action.payload);
            localStorage.setItem("favs", JSON.stringify(state.favs));
            return state.favs;
        }
    }
});

export default favSlice.reducer;

// const {getFav} = favSlice.actions;

// export const fetchFavs = () => async dispatch => {
//     try {
//         await api.get("/favs").then(res => res.json()).then(data => dispatch(getFav(data.data)));
//     } catch (e) {console.log(e)};
// };

// export const pushFav = () => async dispatch => {
//     try {
//         await api.post("/favs")
//     }
// }