import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurnAsset } from "@customtypes/index";

const initialBurnAssetsState: Array<BurnAsset> = [

];

export const burnAssetsSlice = createSlice({
    initialState: initialBurnAssetsState,
    name: "BurnAssets",
    reducers: {
        setBurnAssets: (state, action: PayloadAction<Array<BurnAsset>>) => {
            return [...action.payload];
        }
    }
})

export const { setBurnAssets } = burnAssetsSlice.actions

export default burnAssetsSlice.reducer;