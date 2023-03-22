import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "@customtypes/index";

const initialWalletAssetsState: Array<Asset> = [];

export const walletAssetsSlice = createSlice({
    initialState: initialWalletAssetsState,
    name: "walletAssets",
    reducers: {
        setWalletAssets: (state, action: PayloadAction<Array<Asset>>) => {
            return [ ...action.payload];
        }
    }
})

export const { setWalletAssets } = walletAssetsSlice.actions

export default walletAssetsSlice.reducer;