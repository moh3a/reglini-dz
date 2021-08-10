import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { getAEProductInfo, searchAEProductByName } from "./aeapiAsyncActions";

interface IAEAPI {
  product?: Object;
  search?: Object;
  status: "idle" | "loading" | "complete" | "failed";
  error?: string;
}

const initialState: IAEAPI = {
  status: "idle",
  product: undefined,
  search: undefined,
  error: undefined,
};

export const aeapiSlice = createSlice({
  name: "aeapi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAEProductInfo.pending, (state, action) => {
        state.status = "loading";
        state.search = undefined;
        state.error = undefined;
      })
      .addCase(getAEProductInfo.fulfilled, (state, action) => {
        state.status = "complete";
        state.product = action.payload;
      })
      .addCase(getAEProductInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchAEProductByName.pending, (state, action) => {
        state.status = "loading";
        state.product = undefined;
        state.error = undefined;
      })
      .addCase(searchAEProductByName.fulfilled, (state, action) => {
        state.status = "complete";
        state.search = action.payload;
      })
      .addCase(searchAEProductByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAEApi = (state: RootState) => state.aeapi;

// Action creators are generated for each case reducer function
// export const {} = aeapi.actions;

export default aeapiSlice.reducer;

//   data: {
//     // string The product’s unique identifier, as found in aliexpress.com/item/{{productId}}.html
//     productId,

//     // string
//     // Default: "USD"
//     // The currency you wish to display prices in or pay with.
//     currency: "EUR",

//     // string
//     // Default: "en_US"
//     // The locale (language) in which the product’s textual information should be returned.
//     locale: "fr_FR",

//     // boolean
//     // Default: false
//     // A boolean that, when set to true, returns the response with the additional field “sellerDetails” that contains feedback information on the seller in particular.
//     getSellerDetails: true,

//     // boolean
//     // Default: false
//     // A boolean that, when set to true, returns the response with the additional field “shipping” (exactly the same as the Retrieve Product Shipping endpoint).
//     getShipping: true,

//     // number
//     // Default: 1
//     // The number of items to consider for shipping (prices and carriers may depend on it).
//     // quantity: 2,

//     // string
//     // Default: "CN"
//     // The product's country of provenance (prices and carriers may depend on it).
//     shipFrom: "CN",

//     // string
//     // Default: "US"
//     // The product's country of destination (prices and availability may depend on it). Also used for shipping object if getShipping is true.
//     shipTo: "DZ",

//     // boolean
//     // Default: false
//     // A boolean that, when set to true, returns the response with the additional field “htmlDescription”.
//     getHtmlDescription: true,
//   },
