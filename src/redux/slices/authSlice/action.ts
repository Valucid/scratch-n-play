import { createAsyncThunk } from "@reduxjs/toolkit";
// import { IServerResponseType } from "../../common";
import axiosInstance from "../../../api/axiosinstance";
import { getSimplifiedError } from "../../../utils/errors";
// import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { msisdn: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth-user", data);

      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("msisdn", data.msisdn);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getSimplifiedError(error));
    }
  }
);

export const smsLoginUser = createAsyncThunk(
  "auth/smsLoginUser",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `auth-user/smsLogin?token=${token}`
      );

      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("msisdn", response.data.userDetails.id);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getSimplifiedError(error));
    }
  }
);

// export const logoutUser =
