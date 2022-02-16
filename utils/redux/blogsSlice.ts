import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getBlogs, createBlog } from "./blogsAsyncActions";
import {
  getBlogDetails,
  deleteBlog,
  addComment,
  deleteComment,
  blogLike,
  commentLike,
} from "./blogAsyncActions";

export interface IComment {
  _id?: string;
  blogId?: string;
  userId?: string;
  text?: string;
  votes?: number;
  voters?: [{ userId: string }];
  userPicture?: string;
  userName?: string;
  createdAt?: string;
}

export interface IBlog {
  _id?: string;
  userId?: string;
  userName?: string;
  userPicture?: string;
  slug?: string;
  category?: "dev" | "question" | "news" | "other";
  title?: string;
  text?: string;
  raw_text?: string;
  votes?: number;
  voters?: [{ userId: string }];
  commentsCounter?: number;
  comments?: [IComment];
  createdAt?: string;
}

export interface IBlogs {
  status?: "idle" | "loading" | "complete" | "failed";
  error?: any;
  message?: string;
  blogs: IBlog[];
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
        if (action.payload.id) {
          const index = state.blogs.findIndex(
            (blog) => blog._id?.toString() === action.payload.id
          );
          if (index !== -1) {
            state.blogs.splice(index, 1);
          }
        }
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
      })
      // ========================================================================
      .addCase(blogLike.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(blogLike.fulfilled, (state, action) => {
        state.status = "complete";
        state.blog = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(blogLike.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      // ========================================================================
      .addCase(commentLike.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(commentLike.fulfilled, (state, action) => {
        state.status = "complete";
        state.blog = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(commentLike.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export const selectBlogs = (state: RootState) => state.blogs;
export const {} = blogsSlice.actions;

export default blogsSlice.reducer;
