import { configureStore } from '@reduxjs/toolkit';
import wallpaperSlice from './wallpaperSlice';

export const store = configureStore({
    reducer: {
        wallpaper: wallpaperSlice
    }
});