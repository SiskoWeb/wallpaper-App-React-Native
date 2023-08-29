import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import getWallpapers from "./actions";








const initialState = {
    wallpapers: [],
    Favourite: [],
    isloading: false,
    error: null,
}


const wallpaperSlice = createSlice({
    name: "wallpaper",
    initialState: initialState,

    reducers: {
        setWallpapers(state, action) {
            state.wallpapers = action.payload
        },
        setFavourite(state, action) {
            state.Favourite = [...state.Favourite, action.payload]
            const jsonValue = JSON.stringify(state.Favourite);
            AsyncStorage.setItem('notes', jsonValue);
        },
        deleteFromFavourite(state, action) {
            state.Favourite = state.Favourite.filter(i => i.id !== action.payload.id)
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getWallpapers.pending, (state) => {
            state.isloading = true;
        });
        builder.addCase(getWallpapers.fulfilled, (state, action) => {
            console.log('from redux', action.payload)
            state.wallpapers = action.payload;
            state.isloading = false;
        });
        builder.addCase(getWallpapers.rejected, (state) => {
            state.isloading = false;
            console.log(action.error)
            state.error = action.error.message;
        });
    },

})
// Action creators are generated for each case reducer function
export const { setFavourite, setWallpapers, deleteFromFavourite } = wallpaperSlice.actions

export default wallpaperSlice.reducer