import { createSlice } from "@reduxjs/toolkit"
import { DATA } from '../constants/'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLocalStorage from "../hooks/useLocalStorage";
// get wallpapers from DATA
// check if there is wallpapers in favorte storage
// if not add empty array
// add

const initialState = {
    wallpapers: [],
    Favourite: [],
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
        },
        deleteFromFavourite(state, action) {
            state.Favourite = state.Favourite.filter(i => i.id !== action.payload.id)
        }

    }
})
// Action creators are generated for each case reducer function
export const { setFavourite, setWallpapers ,deleteFromFavourite} = wallpaperSlice.actions
export default wallpaperSlice.reducer