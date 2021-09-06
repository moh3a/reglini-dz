import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import {
  getAEProductInfo,
  searchAEProductByName,
  searchAEProductByCategory,
} from "./aeapiAsyncActions";

interface IAEAPI {
  product?: Object;
  search?: Object;
  status: "idle" | "loading" | "complete" | "failed";
  error?: string;
}

const initialState: IAEAPI = {
  status: "idle",
  product: undefined,
  search: undefined,
  error: undefined,
};

export const aeapiSlice = createSlice({
  name: "aeapi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAEProductInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAEProductInfo.fulfilled, (state, action) => {
        state.status = "complete";
        state.product = action.payload;
      })
      .addCase(getAEProductInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchAEProductByName.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchAEProductByName.fulfilled, (state, action) => {
        state.status = "complete";
        state.product = undefined;
        state.search = action.payload;
      })
      .addCase(searchAEProductByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchAEProductByCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchAEProductByCategory.fulfilled, (state, action) => {
        state.status = "complete";
        state.search = action.payload;
      })
      .addCase(searchAEProductByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.product = undefined;
        state.error = action.error.message;
      });
  },
});

export const selectAEApi = (state: RootState) => state.aeapi;

export default aeapiSlice.reducer;
