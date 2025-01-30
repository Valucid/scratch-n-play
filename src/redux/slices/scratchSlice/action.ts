import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosinstance";

export const fetchUserScratchValue = createAsyncThunk(
  "user/fetchUserScratches",
  async (_, { rejectWithValue }) => {
    const msisdn = sessionStorage.getItem("msisdn");
    try {
      const response = await axiosInstance.get(`users/${msisdn}/check-scratch`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getWinningPrize = createAsyncThunk("scratches/getWinningPrize", async (_, {rejectWithValue}) => {
    const msisdn = sessionStorage.getItem("msisdn");
    try {
       const response = await axiosInstance.get(`users/${msisdn}/play`);
       
       return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateUserScratchValue = createAsyncThunk(
  "user/updateUserScratches",
  async ({newScratchValue}: {newScratchValue: number}, { rejectWithValue }) => {
    const msisdn = sessionStorage.getItem("msisdn");
    try {
      const response = await axiosInstance.patch(`users/${msisdn}/update-scratch`, {
        scratchValue: newScratchValue,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

