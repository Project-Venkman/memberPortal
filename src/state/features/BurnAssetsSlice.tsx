import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Burn } from "@customtypes/index";

const initialBurnAssetsState: Array<Burn> = [{
    name: "",
    description: "",
    url: "",
    burnTypeID: "",
    typeID: "",
    assetID: "",
    assetNumber: "",
    contractAddress: "",
    contractType: 0
}];

export const burnAssetsSlice = createSlice({
    initialState: initialBurnAssetsState,
    name: "BurnAssets",
    reducers: {
        setBurnAssets: (state, action: PayloadAction<Array<Burn>>) => {
            return [...action.payload];
        }
    }
})

export const { setBurnAssets } = burnAssetsSlice.actions

export default burnAssetsSlice.reducer;