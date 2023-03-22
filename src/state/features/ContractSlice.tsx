import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Contract, ContractSetting} from "@customtypes/Mint";

const initialContractState: ContractSetting = {
    ID: "",
    Abi: "",
    ChainURL: "",
    ContractAddress: "",
    ContractDescription: "",
    ContractMinterType: "",
    ContractType: 0,
    ChainAPIKey: "",
    ChainID: "",
    PartnerContractID: ""
}
const initialAllContractState: Array<ContractSetting> = [];

export const AllContractSlice = createSlice({
    initialState: initialAllContractState,
    name: "contracts",
    reducers: {
        setContracts: (state, action: PayloadAction<Array<ContractSetting>>) => {
            return action.payload;
        },
        clearContracts: () => {
            return initialAllContractState;
        }
    }
})

export const ContractSlice = createSlice({
    initialState: initialContractState,
    name: "contract",
    reducers: {
        setContract: (state, action: PayloadAction<ContractSetting>) => {
            return action.payload;
        },
        clearContract: () => {
            return initialContractState;
        }
    }
})

export const { setContracts, clearContracts } = AllContractSlice.actions
export const { setContract, clearContract } = ContractSlice.actions
