import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getBlogs, createBlog, addComment } from "./blogsAsyncActions";

export interface IBlog {
  userId?: string;
  userName?: string;
  userPicture?: string;
  slug?: string;
  title?: string;
  text?: string;
  votes?: number;
  voters?: [{ userId: string }];
  commentsCounter?: number;
  comments?: [
    {
      userId?: string;
      text?: string;
      votes?: number;
      voters?: [{ userId: string }];
    }
  ];
}

export interface IBlogs {
  status?: "idle" | "loading" | "complete" | "failed";
  error?: any;
  message?: string;
  blogs: any[];
}

const initialState: IBlogs = {
  status: "idle",
  blogs: [],
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
      .addCase(addComment.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "complete";
        const index = state.blogs.findIndex(
          (blog: any) =>
            blog._id.toString() === action.payload.data._id.toString()
        );
        if (index !== -1) {
          state.blogs[index] = action.payload.data;
        }
        state.message = action.payload.message;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export const selectBlogs = (state: RootState) => state.blogs;
export const {} = blogsSlice.actions;

export default blogsSlice.reducer;
