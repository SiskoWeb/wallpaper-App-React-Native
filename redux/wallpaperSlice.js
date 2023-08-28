import { createSlice } from "@reduxjs/toolkit"
import AsyncStorage from '@react-native-async-storage/async-storage';



// const findNotes = async () => {
//     const result = await AsyncStorage.getItem('notes');
//     if (result !== null) setNotes(JSON.parse(result));
//     else {
//         return []
//     }
// };
// const writeItemToStorage = async () => {
//     await findNotes()
// };

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
            const jsonValue = JSON.stringify(state.Favourite);
            AsyncStorage.setItem('notes', jsonValue);
        },
        deleteFromFavourite(state, action) {
            state.Favourite = state.Favourite.filter(i => i.id !== action.payload.id)
        }

    }
})
// Action creators are generated for each case reducer function
export const { setFavourite, setWallpapers, deleteFromFavourite } = wallpaperSlice.actions
export default wallpaperSlice.reducer