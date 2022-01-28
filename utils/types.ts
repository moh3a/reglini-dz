import { Session } from "next-auth";
export interface IUser extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    type?: "oauth" | "credentials" | null;
    provider?: string | null;
    accessToken?: string | null;
  };
}

export interface IProduct {
  productId?: string;
  name?: string;
  price?: number;
  originalPrice?: number;
  imageUrl?: string;
}

export interface ICartItem extends IProduct {
  _id?: string;
  quantity?: number;
  properties?: Array<Object>;
  sku?: string;
  carrierId?: string;
  shippingPrice?: number;
  totalPrice?: number;
}

export interface ICart {
  _id?: string;
  cartItems?: Array<ICartItem>;
  subtotal?: number;
  count?: number;
}

export interface IWished extends IProduct {
  _id?: string;
}

export interface IOrder {
  orderId?: String;
  product?: {
    productId: String;
    name: String;
    sku: String;
    price: Number;
    imageUrl: String;
    properties: [{}];
    quantity: number;
    carrierId: String;
    orderMemo: String;
  };
  shippingAddress?: {
    name: String;
    countryCode: String;
    city: String;
    zipCode: String;
    addressLine1: String;
    phoneCountry: String;
    mobilePhone: String;
    province: String;
  };
  status?: String;
  orderDetailsUrl?: String;
  creationTime?: String;
  totalPrice?: {
    productsPrice: { value: Number; display: String };
    shippingPrice: { value: Number; display: String };
    fullOrderPrice: { value: Number; display: String };
  };
  paymentTime?: String;
  readyForDispatchTime?: String;
  isPaid?: Boolean;
  isShipped?: Boolean;
  isFrozen?: Boolean;
  canResume?: Boolean;
  canCancel?: Boolean;
  endReason?: String;
  currency?: String;
  tracking?: {
    isTrackingAvailable: Boolean;
    packages: [
      {
        caption: String;
        readyForDispatchTime: String;
        deliveryTimeRange: { min: String; max: String };
        trackingNumber: String;
        trackingUrl: String;
        carrier: { id: String; name: String };
        progressPercentage: Number;
      }
    ];
  };
}

export interface IUserRedux {
  role?: "basic" | "admin" | "seller";
  _id?: string;
  account?: "credentials" | "oauth" | null;
  provider?: string | null;
  verified?: boolean;
  name?: string | null;
  email?: string | null;
  orders?: Array<IOrder>;
  cart?: ICart;
  wishlist?: Array<IWished>;
}

export interface IAuth {
  isAuthenticated?: boolean;
  user?: IUserRedux;
  status?: "idle" | "loading" | "complete" | "failed";
  error?: any;
  message?: string;
  orderMessage?: string;
  orderStatusCode?: number;
}

export interface IEmailOptions {
  from?: string;
  to?: string | null;
  subject: string;
  text: string;
}

import type { NextApiRequest } from "next";
export interface IExtendedAPIRequest extends NextApiRequest {
  file?: any;
  params?: any;
  userData?: any;
}

export interface IFacebookPageAd {
  ad_status:
    | "request_new_ad"
    | "awaiting_payment"
    | "processing_payment"
    | "ad_success"
    | "ad_fail";
  created_at: string;
  ad_emplacement: string;
  post_url: string;
  ad_audience: string;
  ad_duration: number;
  ad_daily_bugdet: number;
  ad_total_budget: number;
  ad_price: number;
  payment?: {
    wasDeclined: boolean;
    receipt: string;
    paymentMethod: string;
    paymentTime: string;
  };
}

export interface IFacebookPage {
  page_id: string;
  page_name: string;
  page_url: string;
  instagram_page_linked: boolean;
  access_status:
    | "processing_demand"
    | "access_request_sent"
    | "processing_validation"
    | "access_granted"
    | "processing_deletion";
  page_ads: [IFacebookPageAd];
}
