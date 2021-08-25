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
      return data.data;
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
