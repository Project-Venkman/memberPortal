import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UidPwd } from "@customtypes/index";

const initialCredentialsState: UidPwd = {};

const UserCredentialsSlice = createSlice({
    initialState: initialCredentialsState,
    name: "walletAddress",
    reducers: {
        setUserCredentials: (state, action: PayloadAction<UidPwd>) => {
            return action.payload;
        },
        clearCredentials: () => {
            return initialCredentialsState;
        }
    }
})

export const { setUserCredentials, clearCredentials } = UserCredentialsSlice.actions

export default UserCredentialsSlice.reducer;
