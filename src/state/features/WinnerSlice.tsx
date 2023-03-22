import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialWinnerState: boolean = false;

export const winnerSlice = createSlice({
    initialState: initialWinnerState,
    name: "winner",
    reducers: {
        setWinner: (state, action: PayloadAction<boolean>) => {
            return action.payload;
        }
    }
})

export const { setWinner } = winnerSlice.actions

export default winnerSlice.reducer;