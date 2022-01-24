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
        url: `/api/aliexpress/zapiex/${id}`,
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

export const searchAEProductByName = createAsyncThunk(
  "aeapi/searchAEProductByName",
  async ({ name, locale }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `/api/aliexpress/zapiex/search/product/${name}`,
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
