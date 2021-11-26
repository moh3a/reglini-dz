import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  getUser,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  updateQuantity,
  removeFromCart,
  createOrder,
  cancelOrder,
  getOrderDetails,
  getOrderTracking,
} from "./userAsyncActions";
import { IAuth } from "../../utils/types";

const initialState: IAuth = {
  isAuthenticated: false,
  user: undefined,
  status: "idle",
  error: undefined,
  message: "",
  orderMessage: "",
  orderStatusCode: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
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
        state.message = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "complete";
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      //========================================================================================
      .addCase(addToWishlist.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //========================================================================================
      .addCase(removeFromWishlist.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //========================================================================================
      .addCase(addToCart.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //========================================================================================
      .addCase(updateQuantity.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //========================================================================================
      .addCase(removeFromCart.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //========================================================================================
      .addCase(createOrder.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "complete";
        if (action.payload.errorCode) {
          state.orderStatusCode = action.payload.errorCode;
          state.orderMessage = action.payload.message;
        } else {
          state.message = action.payload.message;
        }
        state.user = action.payload.data;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //========================================================================================
      .addCase(cancelOrder.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //========================================================================================
      .addCase(getOrderDetails.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //========================================================================================
      .addCase(getOrderTracking.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(getOrderTracking.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getOrderTracking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const selectUser = (state: RootState) => state.user;
// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
