import { createSlice } from "@reduxjs/toolkit";
import { block, ScratchBlockType } from "../../common";
import { fetchUserScratchValue, getWinningPrize, updateUserScratchValue } from "./action";

interface IScratchState {
    scratches: ScratchBlockType<number>;
    prize: ScratchBlockType<any>;
}

const initialState: IScratchState = {
    scratches: {...block},
    prize: {...block}
}

const scratchSlice = createSlice({
    name: 'scratchSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserScratchValue.pending, (state) => {
            state.scratches.loading = true;
        }).addCase(fetchUserScratchValue.fulfilled, (state, action) => {
            state.scratches.loading = false;
            state.scratches.data = action.payload.scratchValue;
            state.scratches.success = true;
        }).addCase(fetchUserScratchValue.rejected, (state, action) => {
            state.scratches.loading = false;
            state.scratches.error = action.payload as string
        })

        builder.addCase(updateUserScratchValue.pending, (state) => {
            state.scratches.loading = true;
        }).addCase(updateUserScratchValue.fulfilled, (state, action) => {
            state.scratches.loading = false;
            state.scratches.data = action.payload.scratchValue,
            state.scratches.success = true
        }).addCase(updateUserScratchValue.rejected, (state, action) => {
            state.scratches.loading =  false;
            state.scratches.error =action.payload as string
        })

        builder.addCase(getWinningPrize.pending, (state) => {
            state.prize.loading = true;
        }).addCase(getWinningPrize.fulfilled, (state, action) => {
            state.prize.loading = false;
            state.prize.data = action.payload.prize;
            state.scratches.success = true;
        }).addCase(getWinningPrize.rejected, (state, action) => {
            state.prize.loading = false;
            state.scratches.error = action.payload as string
        })


    }
    
})

export default scratchSlice.reducer;