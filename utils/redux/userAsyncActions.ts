import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IUserRedux,
  IWished,
  ICartItem,
  IFacebookPage,
  IFacebookPageAd,
} from "../../types";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (
    {
      email,
      account,
      provider,
    }: {
      email: IUserRedux["email"];
      account: IUserRedux["account"];
      provider: IUserRedux["provider"];
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`/api/auth/user/`, {
        email,
        account,
        provider,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "user/addToWishlist",
  async (
    { productId, name, price, imageUrl }: IWished,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`/api/user/wishlist`, {
        productId,
        name,
        price,
        imageUrl,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "user/removeFromWishlist",
  async ({ id }: { id: IWished["productId"] }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/user/wishlist/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (
    {
      productId,
      name,
      price,
      imageUrl,
      properties,
      sku,
      quantity,
      carrierId,
      shippingPrice,
      totalPrice,
    }: ICartItem,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/api/user/cart", {
        productId,
        name,
        price,
        imageUrl,
        properties,
        sku,
        quantity,
        carrierId,
        shippingPrice,
        totalPrice,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "user/updateQuantity",
  async (
    {
      id,
      quantity,
    }: { id: ICartItem["productId"]; quantity: ICartItem["quantity"] },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(`/api/user/cart/${id}`, {
        quantity,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "user/removeFromCart",
  async ({ id }: { id: ICartItem["productId"] }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/user/cart/${id}`);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const createOrder = createAsyncThunk(
  "user/createOrder",
  async ({ product, shippingAddress }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/aliexpress/ds/order/create`,
        {
          product,
          shippingAddress,
        },
        { headers: { "Content-type": "application/json" } }
      );
      if (data.success) {
        return data;
      } else {
        console.log(data);
      }
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "user/cancelOrder",
  async ({ id }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/aliexpress/zapiex/order/cancel`, {
        id,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "user/deleteOrder",
  async ({ id }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/aliexpress/zapiex/order/delete/${id}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "user/getOrderDetails",
  async ({ id }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/aliexpress/ds/order/get`, {
        orderId: id,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const editRealName = createAsyncThunk(
  "user/editRealName",
  async ({ realName }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/details/realname", {
        realName,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const editPhoneNumber = createAsyncThunk(
  "user/editPhoneNumber",
  async ({ phoneNumber }: any, { rejectWithValue }) => {
    try {
      let phone = phoneNumber.replace(/[-a-zA-Z!@#$%^&* ]/g, "");
      if (phone[0] === "0") {
        phone = phone.slice(1);
      }
      phone = "+213" + phone;
      const { data } = await axios.post("/api/user/details/phonenumber", {
        phoneNumber: phone,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const editAddress = createAsyncThunk(
  "user/editAddress",
  async (
    { wilaya, daira, postalCode, addressLine, commune }: any,
    { rejectWithValue }
  ) => {
    try {
      let address =
        addressLine +
        ", " +
        commune.name +
        ", wilaya " +
        wilaya.name +
        " " +
        postalCode;
      const { data } = await axios.post("/api/user/details/address", {
        text: address,
        postalCode,
        wilaya: wilaya.name,
        daira: daira.name,
        commune: commune.name,
        streetName: addressLine,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const editProfilePicture = createAsyncThunk(
  "user/editProfilePicture",
  async ({ body }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/user/details/updatepicture",
        body
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const editUsername = createAsyncThunk(
  "user/editUsername",
  async ({ username }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/details/username", {
        username,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const editProfileAvatar = createAsyncThunk(
  "user/editProfileAvatar",
  async ({ generated }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/details/updateavatar", {
        picture: generated,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const submitPayment = createAsyncThunk(
  "user/submitPayment",
  async ({ body, url }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(url, body);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const submitFeedback = createAsyncThunk(
  "user/submitFeedback",
  async ({ body }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/user/details/orderreceived",
        body
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const demandAccessRequest = createAsyncThunk(
  "user/demandAccessRequest",
  async ({ pageName, pageUrl, instagramPage }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/user/metaads/demandaccessrequest",
        { pageName, pageUrl, instagramPage }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteFacebookPageAccess = createAsyncThunk(
  "user/deleteFacebookPageAccess",
  async ({ pageId }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/metaads/deletepageaccess", {
        pageId,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const validateFacebookPageAccess = createAsyncThunk(
  "user/validateFacebookPageAccess",
  async ({ pageId }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/user/metaads/validatepageaccess",
        {
          pageId,
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const createAdRequest = createAsyncThunk(
  "user/createAdRequest",
  async (
    {
      pageId,
      pageAd,
    }: { pageId: IFacebookPage["page_id"]; pageAd: IFacebookPageAd },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        "/api/user/metaads/ad/createadrequest",
        {
          pageId,
          pageAd,
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);
