import { createSlice } from "@reduxjs/toolkit";
import { block, ScratchBlockType } from "../../common";
import {
  fetchUserScratchValue,
  getPrizeList,
  getWinnersList,
  getWinningPrize,
  updateUserScratchValue,
} from "./action";

interface IScratchState {
  scratches: ScratchBlockType<number>;
  prize: ScratchBlockType<any>;
  prizeList: ScratchBlockType<any>;
  winners: ScratchBlockType<any>;
  winnersList: ScratchBlockType<any>;
}

const initialState: IScratchState = {
  scratches: { ...block },
  prize: { ...block },
  prizeList: { ...block },
  winners: { ...block },
  winnersList: { ...block },
};

const scratchSlice = createSlice({
  name: "scratchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserScratchValue.pending, (state) => {
        state.scratches.loading = true;
      })
      .addCase(fetchUserScratchValue.fulfilled, (state, action) => {
        state.scratches.loading = false;
        state.scratches.data = action.payload.scratchValue;
        state.scratches.success = true;
      })
      .addCase(fetchUserScratchValue.rejected, (state, action) => {
        state.scratches.loading = false;
        state.scratches.error = action.payload as string;
      });

    builder
      .addCase(updateUserScratchValue.pending, (state) => {
        state.scratches.loading = true;
      })
      .addCase(updateUserScratchValue.fulfilled, (state, action) => {
        state.scratches.loading = false;
        (state.scratches.data = action.payload.scratchValue),
          (state.scratches.success = true);
      })
      .addCase(updateUserScratchValue.rejected, (state, action) => {
        state.scratches.loading = false;
        state.scratches.error = action.payload as string;
      });

    builder
      .addCase(getWinningPrize.pending, (state) => {
        state.prize.loading = true;
      })
      .addCase(getWinningPrize.fulfilled, (state, action) => {
        state.prize.loading = false;
        state.prize.data = action.payload.prize;
        state.scratches.success = true;
      })
      .addCase(getWinningPrize.rejected, (state, action) => {
        state.prize.loading = false;
        state.scratches.error = action.payload as string;
      });

    builder
      .addCase(getPrizeList.pending, (state) => {
        state.prizeList.loading = true;
      })
      .addCase(getPrizeList.fulfilled, (state, action) => {
        state.prizeList.loading = false;
        state.prizeList.data = action.payload.prizes;
        state.prizeList.success = true;
      })
      .addCase(getPrizeList.rejected, (state, action) => {
        state.prizeList.loading = false;
        state.prizeList.error = action.payload as string;
      });

    builder
      .addCase(getWinnersList.pending, (state) => {
        state.winnersList.loading = true;
      })
      .addCase(getWinnersList.fulfilled, (state, action) => {
        state.winnersList.loading = false;
        state.winnersList.data = action.payload.data;
        state.winnersList.success = true;
      })
      .addCase(getWinnersList.rejected, (state, action) => {
        state.winnersList.loading = false;
        state.winnersList.error = action.error.message;
      });
  },
});

export default scratchSlice.reducer;
