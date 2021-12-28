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
    { title, text }: { title: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`/api/community/newblog`, {
        title,
        text,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const addComment = createAsyncThunk(
  "blogs/addComment",
  async (
    { blogId, text }: { blogId: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`/api/community/newcomment`, {
        blogId,
        text,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);
