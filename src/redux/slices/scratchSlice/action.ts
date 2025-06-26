import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosinstance";

export const fetchUserScratchValue = createAsyncThunk(
  "user/fetchUserScratches",
  async (_, { rejectWithValue }) => {
    const msisdn = sessionStorage.getItem("msisdn");
    try {
      const response = await axiosInstance.get(`users/${msisdn}/check-scratch`);

      console.log("Scratch Value Response:", response.data);

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

        console.log("Winning Prize Response:", response.data);
        
  
       
       return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateUserScratchValue = createAsyncThunk(
  "user/updateUserScratches",
  async ({newScratchValue}: {newScratchValue: number}, { rejectWithValue }) => {
    const msisdn = sessionStorage.getItem("msisdn");
    console.log({newScratchValue}, 'newScratchValue');
    try {
      const response = await axiosInstance.patch(`users/${msisdn}/update-scratch`, {
        scratchValue: newScratchValue,
      });

      console.log("Updated Scratch Value Response:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createWinners = createAsyncThunk('users/createWinners', async (data: any, {rejectWithValue}) => {
    const msisdn = sessionStorage.getItem("msisdn");
    try {
        const response = await axiosInstance.post(`users/${msisdn}/winners`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getPrizeList = createAsyncThunk('users/getPrizeList', async (_, {rejectWithValue}) => {
  const msisdn = sessionStorage.getItem("msisdn");
    try {
        const response = await axiosInstance.get(`users/${msisdn}/prizesList`);

        console.log("Prize List Responsessss:", response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

