import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAEProductInfo = createAsyncThunk(
  "aeapi/getAEProductInfo",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/api/aliexpress/${id}`,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const searchAEProductByName = createAsyncThunk(
  "aeapi/searchAEProductByName",
  async (name: string, { rejectWithValue }) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/api/aliexpress/search/${name}`,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
