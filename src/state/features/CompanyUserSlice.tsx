import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyUser, Base } from "@customtypes/index";

const initialCompanyUserState: Omit<CompanyUser, keyof Base> = {
    adminUserId: "",
    companyId: "",
    companyOnly: false,
    contractTypeId: "",
    forceAuthDb: false,
    sessionId: "",
    userName: ""
};

export const CompanyUserSlice = createSlice({
    initialState: initialCompanyUserState,
    name: "companyUser",
    reducers: {
        setCompanyUser: (state, action: PayloadAction<Omit<CompanyUser, keyof Base>>) => {
            return action.payload;
        },
        changeContractTypeId: (state, action: PayloadAction<string>) => {
            state.contractTypeId = action.payload;
        },
        clearCompanyUser: () => {
            return initialCompanyUserState;
        }
    }
})

export const { setCompanyUser, changeContractTypeId, clearCompanyUser } = CompanyUserSlice.actions

export default CompanyUserSlice.reducer;