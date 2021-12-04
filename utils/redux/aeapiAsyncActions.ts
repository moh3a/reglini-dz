import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAEProductInfo = createAsyncThunk(
  "aeapi/getAEProductInfo",
  async (
    { id, locale }: { id: string | string[]; locale: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `/api/aliexpress/${id}`,
        data: {
          locale,
        },
      });
      console.log(data.data);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const searchAEProductByName = createAsyncThunk(
  "aeapi/searchAEProductByName",
  async ({ name, locale }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `/api/aliexpress/search/product/${name}`,
        data: {
          locale,
        },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);
