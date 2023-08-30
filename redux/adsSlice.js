import { createSlice } from "@reduxjs/toolkit"








const initialState = {
    bannerID: 'ca-app-pub-3940256099942544/6300978111',
    interstitialID: '',
    rewardedID: '',

}


const adsSlice = createSlice({
    name: "ads",
    initialState: initialState,

    reducers: {
        setIds(state, action) {
            state.bannerID = action.payload.banner
            state.interstitialID = action.payload.interstitial
            state.rewardedID = action.payload.rewarded
        },


    },


})
// Action creators are generated for each case reducer function
export const { setFavourite, setWallpapers, deleteFromFavourite } = adsSlice.actions

export default adsSlice.reducer