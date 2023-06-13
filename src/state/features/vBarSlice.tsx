import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from '@customtypes/index';

const initialVbarState: Array<Coin> = [];

export const vBarSlice = createSlice({
    initialState: initialVbarState,
    name: 'vBar',
    reducers: {
        setvBar: (state, action: PayloadAction<Array<Coin>>) => {
            return [...action.payload];
        },
    },
});

export const { setvBar } = vBarSlice.actions;
export default vBarSlice.reducer;
