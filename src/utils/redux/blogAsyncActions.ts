import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBlogDetails = createAsyncThunk(
  "blogs/getBlogDetails",
  async ({ slug }: { slug: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/community/blogslug/${slug}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async ({ id }: { id: string | undefined }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/community/blog/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const addComment = createAsyncThunk(
  "blogs/addComment",
  async (
    { blogId, text }: { blogId: string | undefined; text: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `/api/community/blog/${blogId}/comment`,
        {
          text,
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "blogs/deleteComment",
  async (
    {
      blogId,
      commentId,
    }: { blogId: string | undefined; commentId: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.delete(
        `/api/community/blog/${blogId}/comment/${commentId}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const blogLike = createAsyncThunk(
  "blogs/blogLike",
  async ({ blogId }: { blogId: string | undefined }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/community/blog/${blogId}/vote`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const commentLike = createAsyncThunk(
  "blogs/commentLike",
  async (
    {
      blogId,
      commentId,
    }: { blogId: string | undefined; commentId: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `/api/community/blog/${blogId}/comment/${commentId}/vote`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);
