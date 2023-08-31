import { createSlice } from "@reduxjs/toolkit"








const initialState = {
    "Banner": "",
    "AppOpen": "",
    "Interstitial": "",
    "Rewarded": ""

}


const adsSlice = createSlice({
    name: "ads",
    initialState: initialState,

    reducers: {
        setIds(state, action) {
            state.Banner = action.payload.Banner
            state.AppOpen = action.payload.AppOpen
            state.Interstitial = action.payload.Interstitial
            state.Rewarded = action.payload.Rewarded
        },


    },


})
// Action creators are generated for each case reducer function
export const { setIds } = adsSlice.actions

export default adsSlice.reducer