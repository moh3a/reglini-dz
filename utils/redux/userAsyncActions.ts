import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserRedux, IWished, ICartItem } from "../../utils/types";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (
    {
      email,
      account,
      provider,
    }: {
      email: IUserRedux["email"];
      account: IUserRedux["account"];
      provider: IUserRedux["provider"];
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`/api/auth/user/`, {
        email,
        account,
        provider,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "user/addToWishlist",
  async (
    { productId, name, price, imageUrl }: IWished,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`/api/wishlist`, {
        productId,
        name,
        price,
        imageUrl,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "user/removeFromWishlist",
  async ({ id }: { id: IWished["productId"] }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/wishlist/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (
    {
      productId,
      name,
      price,
      imageUrl,
      properties,
      quantity,
      shipping,
    }: ICartItem,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/api/cart", {
        productId,
        name,
        price,
        imageUrl,
        properties,
        quantity,
        shipping,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "user/updateQuantity",
  async (
    {
      id,
      quantity,
    }: { id: ICartItem["productId"]; quantity: ICartItem["quantity"] },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(`/api/cart/${id}`, {
        quantity,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "user/removeFromCart",
  async ({ id }: { id: ICartItem["productId"] }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/cart/${id}`);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);
