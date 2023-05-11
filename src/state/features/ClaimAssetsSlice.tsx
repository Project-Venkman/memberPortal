import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Claim } from "@customtypes/index";

const initialClaimAssetsState: Array<Claim> = [{
    archived: false,
    assetId: "",
    claimed: false,
    code: "",
    createBy: "",
    createDate: "",
    description: "",
    id: "",
    name: "",
    orderId: "",
    tokenId: "",
    updateBy: "",
    updateDate: "",
    url: "",
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