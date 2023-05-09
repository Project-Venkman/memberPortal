import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset, Burn } from "@customtypes/index";
import { act } from "react-dom/test-utils";

const initialCurrentAssetState: Asset = {
    animation: "",
    animationSmall: "",
    archived: false,
    attributes: [],
    contractId: "",
    createdBy: "",
    createdDate: "",
    description: "",
    id: "",
    image: "",
    imageSmall: "",
    name: "",
    ownerId: "",
    status: "",
    tokenId: "",
    updatedBy: "",
    updatedDate: "",
};

const initialCurrentBurnAssetState: Burn = {
    abi: [],
    address: "",
    archived: false,
    burnable: false,
    chainAPIKey: "",
    chainId: 1,
    chainURL: "",
    createBy: "",
    createdDate: "",
    deployedBlock: "",
    description: "",
    id: "",
    minter: "",
    partnerContractId: "",
    symbol: "",
    type: "",
    updatedBy: "",
    updatedDate: "",
}

export const currentAssetSlice = createSlice({
    initialState: initialCurrentAssetState,
    name: "currentAsset",
    reducers: {
        setCurrentAsset: (state, action: PayloadAction<Asset>) => {
            return { ...state, ...action.payload };
        }
    }
});

export const currentBurnAssetSlice = createSlice({
    initialState: initialCurrentBurnAssetState,
    name: "currentBurnAsset",
    reducers: {
        setCurrentBurnAsset: (state, action: PayloadAction<Burn>) => {
            return { ...state, ...action.payload };
        }
    }
});

const assetAppReducers = combineReducers({
    currentAsset: currentAssetSlice.reducer,
    currentBurnAsset: currentBurnAssetSlice.reducer
})

export const { setCurrentAsset } = currentAssetSlice.actions;
export const { setCurrentBurnAsset } = currentBurnAssetSlice.actions;

export default assetAppReducers;