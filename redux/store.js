import { configureStore } from '@reduxjs/toolkit';
import wallpaperSlice from './wallpaperSlice';
import adsSlice from './adsSlice';

export const store = configureStore({
    reducer: {
        wallpaper: wallpaperSlice,
        ads: adsSlice
    }
});