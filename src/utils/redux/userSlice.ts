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
  deleteOrder,
  getOrderDetails,
  editRealName,
  editPhoneNumber,
  editAddress,
  editProfilePicture,
  editProfileAvatar,
  editUsername,
  submitPayment,
  submitFeedback,
} from "./userAsyncActions";
import { signOut } from "next-auth/client";
import { IAuth } from "../../types";

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
        if (action.payload.success) {
          state.status = "complete";
          state.isAuthenticated = true;
          state.user = action.payload.data;
          state.message = action.payload.message;
        } else {
          state.status = "failed";
          state.isAuthenticated = false;
          state.message = action.payload.message;
          signOut();
        }
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
        if (action.payload.success) {
          state.user = action.payload.data;
        }
        state.message = action.payload.message;
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
      .addCase(deleteOrder.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
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
      .addCase(editRealName.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(editRealName.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(editRealName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //========================================================================================
      .addCase(editPhoneNumber.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(editPhoneNumber.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(editPhoneNumber.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //========================================================================================
      .addCase(editAddress.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //========================================================================================
      .addCase(editProfilePicture.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(editProfilePicture.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(editProfilePicture.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //========================================================================================
      .addCase(editUsername.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(editUsername.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(editUsername.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //========================================================================================
      .addCase(editProfileAvatar.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(editProfileAvatar.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(editProfileAvatar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //========================================================================================
      .addCase(submitPayment.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(submitPayment.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(submitPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //========================================================================================
      .addCase(submitFeedback.pending, (state, action) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.status = "complete";
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
    //========================================================================================
  },
});

export const selectUser = (state: RootState) => state.user;
// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
