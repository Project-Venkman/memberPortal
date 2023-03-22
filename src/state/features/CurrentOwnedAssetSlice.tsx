import {combineReducers, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Asset, Burn} from "@customtypes/index";
import {act} from "react-dom/test-utils";
import {Metadata} from "@customtypes/HyperMint";

const initialCurrentAssetState: Metadata = {};

export const currentOwnedAssetSlice = createSlice({
    initialState: initialCurrentAssetState,
    name: "currentOwnedAsset",
    reducers: {
        setCurrentOwnedAsset: (state, action: PayloadAction<Metadata>) => {
            return {...state, ...action.payload};
        }
    }
});

export const { setCurrentOwnedAsset } = currentOwnedAssetSlice.actions;

export default currentOwnedAssetSlice.reducer;