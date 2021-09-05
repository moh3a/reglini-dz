import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "./store";
import { IProduct } from "../../types/productType";

const initialState: IProduct = {
  _id: "",
  name: "",
  slug: "",
  description: "",
  price: 0,
  countInStock: 0,
  imageUrl: "",
  status: "idle",
  error: undefined,
};

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (slug: IProduct["slug"], { rejectWithValue }) => {
    try {
      if (slug) {
        const { data } = await axios.get(`/api/products/${slug}`);
        return data.product;
      }
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "complete";
        state._id = action.payload._id;
        state.name = action.payload.name;
        state.slug = action.payload.slug;
        state.description = action.payload.description;
        state.price = action.payload.price;
        state.countInStock = action.payload.countInStock;
        state.imageUrl = action.payload.imageUrl;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectProduct = (state: RootState) => state.product;

export default productSlice.reducer;
