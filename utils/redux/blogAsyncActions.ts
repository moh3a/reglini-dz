import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBlogDetails = createAsyncThunk(
  "blogs/getBlogDetails",
  async ({ slug }: { slug: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/community/blog/${slug}`);
      console.log(data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);
