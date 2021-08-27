import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IGetUser {
  email: string;
  account: string;
  provider?: string;
}

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, account, provider }: IGetUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/auth/user/`, {
        email,
        account,
        provider,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "user/addToWishlist",
  async ({ productId, name, price, imageUrl }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/wishlist`, {
        productId,
        name,
        price,
        imageUrl,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "user/removeFromWishlist",
  async ({ id }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/wishlist/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (
    { productId, name, price, imageUrl, quantity }: any,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/api/cart", {
        productId,
        name,
        price,
        imageUrl,
        quantity,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "user/updateQuantity",
  async ({ id, quantity }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/api/cart/${id}`, {
        quantity,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "user/removeFromCart",
  async ({ id }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/cart/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
