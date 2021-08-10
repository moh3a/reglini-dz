import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//
import { IAuth, IUser, ICartItem } from "../../types/authType";
import { IProduct } from "../../types/productType";
import { tokenConfig } from "../tokenConfig";

interface IEditInCart {
  productId?: ICartItem["productId"];
  quantity?: ICartItem["quantity"];
  token?: IAuth["token"];
}

export interface IAddToCart {
  _id: IProduct["_id"];
  name: IProduct["name"];
  slug: IProduct["slug"];
  price: IProduct["price"];
  countInStock: IProduct["countInStock"];
  imageUrl: IProduct["imageUrl"];
  token: IAuth["token"];
  quantity: ICartItem["quantity"];
}

export const addItemToCart = createAsyncThunk(
  "auth/addItemToCart",
  async (
    {
      _id,
      name,
      slug,
      price,
      countInStock,
      imageUrl,
      quantity,
      token,
    }: IAddToCart,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        "/api/cart",
        {
          productId: _id,
          name,
          slug,
          price,
          countInStock,
          imageUrl,
          quantity,
        },
        tokenConfig(token)
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  "auth/updateItemQuantity",
  async ({ productId, quantity, token }: IEditInCart, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `/api/cart/${productId}`,
        { quantity },
        tokenConfig(token)
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "auth/removeItemFromCart",
  async ({ productId, token }: IEditInCart, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/cart/${productId}`,
        tokenConfig(token)
      );

      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
