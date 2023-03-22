import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "@customtypes/index";
import { Metadata } from "@customtypes/HyperMint";

const initialOwnedAssetsState: Array<Metadata> = [];

export const OwnedAssetsSlice = createSlice({
    initialState: initialOwnedAssetsState,
    name: "ownedAssets",
    reducers: {
        setOwnedAssets: (state, action: PayloadAction<Array<Metadata>>) => {
            return [ ...action.payload];
        }
    }
})

export const { setOwnedAssets } = OwnedAssetsSlice.actions

export default OwnedAssetsSlice.reducer;