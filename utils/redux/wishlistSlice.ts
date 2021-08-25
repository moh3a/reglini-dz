import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { addToWishlist, removeFromWishlist } from "./userAsyncActions";

interface IUser {
  wishlist: [];
  status: "idle" | "loading" | "complete" | "failed";
  error?: string;
  message: string;
}

const initialState: IUser = {
  wishlist: [],
  status: "idle",
  error: undefined,
  message: "",
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = "complete";
        state.wishlist = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeFromWishlist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = "complete";
        state.wishlist = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectWishlist = (state: RootState) => state.wishlist;
// Action creators are generated for each case reducer function
export const {} = wishlistSlice.actions;

export default wishlistSlice.reducer;
