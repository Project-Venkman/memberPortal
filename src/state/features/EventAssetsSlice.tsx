import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "@customtypes/index";

const initialEventAssetsState: Array<Asset> = [{
    name: "",
    description: "",
    url: "",
    typeID: "",
    assetID: "",
    assetNumber: "",
    childAssets: [],
    assetOwnerID: ""
}];

export const eventAssetsSlice = createSlice({
    initialState: initialEventAssetsState,
    name: "EventAssets",
    reducers: {
        setEventAssets: (state, action: PayloadAction<Array<Asset>>) => {
            return [...action.payload];
        }
    }
})

export const { setEventAssets } = eventAssetsSlice.actions

export default eventAssetsSlice.reducer;