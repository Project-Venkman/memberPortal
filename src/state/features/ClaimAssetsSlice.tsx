import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Claim } from "@customtypes/index";

const initialClaimAssetsState: Array<Claim> = [{
    name: "",
    description: "",
    url: "",
    claimTypeID: "",
    contractTypeID: "",
    code: "",
    claimed: false,
    tokenID: ""
}];

export const claimAssetsSlice = createSlice({
    initialState: initialClaimAssetsState,
    name: "ClaimAssets",
    reducers: {
        setClaimAssets: (state, action: PayloadAction<Array<Claim>>) => {
            return [...action.payload];
        }
    }
})

export const { setClaimAssets } = claimAssetsSlice.actions

export default claimAssetsSlice.reducer;