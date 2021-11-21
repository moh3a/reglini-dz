import { Session } from "next-auth";
export interface IUser extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    type?: "oauth" | "credentials" | null;
    provider?: string | null;
  };
}

export interface IProduct {
  productId?: string;
  name?: string;
  price?: number;
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
}

export interface IEmailOptions {
  from?: string;
  to?: string | null;
  subject: string;
  text: string;
}
