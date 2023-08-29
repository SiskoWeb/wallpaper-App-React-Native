
import { createAsyncThunk } from "@reduxjs/toolkit";

 const getWallpapers = createAsyncThunk("wallpaper/getWallpapers", async () => {
    try {
        const response = await axios.get('https://drive.google.com/uc?export=download&id=1XcaBRG12025VyCTK657o3Hujd7wZQWBU')

        return response.data;
    } catch (error) {
        return error.response;
    }
});

export default getWallpapers
