import { createSlice } from "@reduxjs/toolkit";
//
import { RootState } from "./store";
import { getUser, login, register } from "./authAsyncActions";
import {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
} from "./cartAsyncActions";
import { IAuth } from "../../types/authType";
//
const initialState: IAuth = {
  token: null,
  isAuthenticated: false,
  user: undefined,
  status: "idle",
  error: undefined,
};
//
export const authSlice = createSlice({
  name: "auth",
  initialState, //getInitialState(),
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.isAuthenticated = false;
      state.error = undefined;
      state.token = null;
      state.user = undefined;
      if (typeof window !== "undefined") localStorage.removeItem("authToken");
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
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      //
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "complete";
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.data;
        if (typeof window !== "undefined")
          localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message;
        state.token = null;
        if (typeof window !== "undefined") localStorage.removeItem("authToken");
      })
      //
      .addCase(register.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "complete";
        state.isAuthenticated = true;
        state.token = action.payload.token;
        if (typeof window !== "undefined")
          localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message;
        state.token = null;
        if (typeof window !== "undefined") localStorage.removeItem("authToken");
      })
      .addCase(addItemToCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "complete";
        state.user.cart = action.payload.cart;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateItemQuantity.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.status = "complete";
        state.user.cart = action.payload.cart;
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeItemFromCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = "complete";
        state.user.cart = action.payload.cart;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;
// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;

//
// const getInitialState = () => {
//   let initialState: IAuth;
//   initialState = {
//     token: null,
//     isAuthenticated: false,
//     user: undefined,
//     status: "idle",
//     error: undefined,
//   };
//   if (typeof window !== "undefined") {
//     let token = localStorage.getItem("authToken");
//     if (token) {
//       initialState = {
//         token,
//         isAuthenticated: true,
//         status: "idle",
//       };
//     }
//   }
//   return initialState;
// };
//
