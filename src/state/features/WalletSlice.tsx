import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {WalletData} from "@customtypes/index";

const initialState: WalletData = {
    companyId: "",
    walletAddress: "",
    walletBalance: 0,
    metadata: null,
    ownedAssets: []
}

export const walletSlice = createSlice({
    name: "wallet",
    initialState: initialState,
    reducers: {
        setWallet: (state, action: PayloadAction<WalletData>) => {
            return action.payload;
        },
        setEmptyWallet: (state, action:PayloadAction<string>) => {
            return {
                companyId: "",
                walletAddress: action.payload,
                walletBalance: 0,
                metadata: null,
                ownedAssets: []
            };
        },
        removeWallet: (state) => {
            return;
        }
    }
})

export const { setWallet, setEmptyWallet, removeWallet } = walletSlice.actions

export default walletSlice.reducer;