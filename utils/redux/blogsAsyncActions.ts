import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBlogs = createAsyncThunk("blogs/getBlogs", async () => {
  try {
    const { data } = await axios.get("/api/community");
    return data;
  } catch (error: any) {
    return error.response;
  }
});

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (
    {
      title,
      text,
      raw_text,
    }: { title: string; text: string; raw_text: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`/api/community/blog`, {
        title,
        text,
        raw_text,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);
