import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from '@customtypes/index';

const initialCrownState: Array<Coin> = [];

export const crownSlice = createSlice({
    initialState: initialCrownState,
    name: 'vBar',
    reducers: {
        setCrown: (state, action: PayloadAction<Array<Coin>>) => {
            return [...action.payload];
        },
    },
});

export const { setCrown } = crownSlice.actions;
export default crownSlice.reducer;
