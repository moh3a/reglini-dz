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
  shipping?: string;
  sku?: string;
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

export interface IUserRedux {
  role?: "basic" | "admin" | "seller";
  _id?: string;
  account?: "credentials" | "oauth" | null;
  provider?: string | null;
  verified?: boolean;
  name?: string | null;
  email?: string | null;
  cart?: ICart;
  wishlist?: Array<IWished>;
}

export interface IAuth {
  isAuthenticated?: boolean;
  user?: IUserRedux;
  status?: "idle" | "loading" | "complete" | "failed";
  error?: string;
  message?: string;
}

export interface IEmailOptions {
  from?: string;
  to?: string | null;
  subject: string;
  text: string;
}
