import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialWalletAddressState: string = '';

export const walletAddressSlice = createSlice({
    initialState: initialWalletAddressState,
    name: 'walletAddress',
    reducers: {
        setWalletAddress: (state, action: PayloadAction<string>) => {
            return action.payload;
        },
    },
});

export const providerSlice = createSlice({
    initialState: '',
    name: 'provider',
    reducers: {
        setProvider: (state, action: PayloadAction<string>) => {
            return action.payload;
        },
    },
});

export const signerSlice = createSlice({
    initialState: '',
    name: 'provider',
    reducers: {
        setSigner: (state, action: PayloadAction<string>) => {
            return action.payload;
        },
    },
});

export const { setWalletAddress } = walletAddressSlice.actions;

export default walletAddressSlice.reducer;
