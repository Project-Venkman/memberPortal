import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Burn } from "@customtypes/index";

const initialBurnAssetsState: Array<Burn> = [{
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