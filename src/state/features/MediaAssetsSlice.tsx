import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Media } from "@customtypes/index";

const initialMediaAssetsState: Array<Media> = [{
    name: "",
    description: "",
    url: "",
    mediaTypeID: "",
    contractTypeID: ""
}];

export const mediaAssetsSlice = createSlice({
    initialState: initialMediaAssetsState,
    name: "MediaAssets",
    reducers: {
        setMediaAssets: (state, action: PayloadAction<Array<Media>>) => {
            return [...action.payload];
        }
    }
})

export const { setMediaAssets } = mediaAssetsSlice.actions

export default mediaAssetsSlice.reducer;