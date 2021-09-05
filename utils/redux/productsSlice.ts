import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "./store";
import { IProducts } from "../../types/productType";

const initialState: IProducts = {
  products: [],
  status: "idle",
  error: undefined,
};

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const { data } = await axios.get("/api/products");
  return data;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "complete";
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectProducts = (state: RootState) => state.products;

export default productSlice.reducer;
