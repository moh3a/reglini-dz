import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getBlogs, createBlog } from "./blogsAsyncActions";
import {
  getBlogDetails,
  deleteBlog,
  addComment,
  deleteComment,
} from "./blogAsyncActions";

export interface IBlog {
  _id?: string;
  userId?: string;
  userName?: string;
  userPicture?: string;
  slug?: string;
  title?: string;
  text?: string;
  raw_text?: string;
  votes?: number;
  voters?: [{ userId: string }];
  commentsCounter?: number;
  comments?: [
    {
      _id?: string;
      userId?: string;
      text?: string;
      votes?: number;
      voters?: [{ userId: string }];
      userPicture?: string;
      userName?: string;
      createdAt?: string;
    }
  ];
  createdAt?: string;
}

export interface IBlogs {
  status?: "idle" | "loading" | "complete" | "failed";
  error?: any;
  message?: string;
  blogs: any[];
  blog: IBlog;
}

const initialState: IBlogs = {
  status: "idle",
  blogs: [],
  blog: {},
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.status = "complete";
        state.blogs = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      // ========================================================================
      .addCase(createBlog.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = "complete";
        state.blogs.unshift(action.payload.data);
        state.message = action.payload.message;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      // ========================================================================
      .addCase(deleteBlog.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = "complete";
        state.message = action.payload.message;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      // ========================================================================
      .addCase(getBlogDetails.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(getBlogDetails.fulfilled, (state, action) => {
        state.status = "complete";
        state.blog = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getBlogDetails.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      // ========================================================================
      .addCase(addComment.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "complete";
        state.blog = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      // ========================================================================
      .addCase(deleteComment.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "complete";
        state.blog = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export const selectBlogs = (state: RootState) => state.blogs;
export const {} = blogsSlice.actions;

export default blogsSlice.reducer;
