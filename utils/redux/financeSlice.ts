import { RootState } from "./store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IFinance {
  rate?: number;
  commission?: number;
  status: "idle" | "loading" | "complete" | "failed";
  error?: string;
}

const initialState: IFinance = {
  status: "idle",
  rate: undefined,
  commission: undefined,
  error: undefined,
};

export const fetchCurrencyRate = createAsyncThunk(
  "finance/fetchCurrencyRate",
  async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/api/currency`,
      });
      console.log(data);
      return data.data;
    } catch (error: any) {
      return error.response;
    }
  }
);

export const fetchCommission = createAsyncThunk(
  "finance/fetchCommission",
  async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `/api/commission`,
      });
      console.log(data);
      return data.commission;
    } catch (error: any) {
      return error.response;
    }
  }
);

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyRate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCurrencyRate.fulfilled, (state, action) => {
        state.status = "complete";
        state.rate = action.payload;
      })
      .addCase(fetchCurrencyRate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCommission.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCommission.fulfilled, (state, action) => {
        state.status = "complete";
        state.commission = action.payload;
      })
      .addCase(fetchCommission.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectFinance = (state: RootState) => state.finance;

export default financeSlice.reducer;
