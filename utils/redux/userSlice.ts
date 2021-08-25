import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getUser } from "./userAsyncActions";

interface IUser {
  isAuthenticated: boolean;
  user?: Object;
  status: "idle" | "loading" | "complete" | "failed";
  error?: string;
}

const initialState: IUser = {
  isAuthenticated: false,
  user: undefined,
  status: "idle",
  error: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState, //getInitialState(),
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.isAuthenticated = false;
      state.error = undefined;
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "complete";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state: RootState) => state.user;
// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
