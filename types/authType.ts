export interface ICartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  countInStock: number;
  imageUrl: string;
  quantity: number;
}

export interface ICart {
  cartItems: Array<ICartItem>;
  subtotal: number;
  count: number;
  status?: "idle" | "loading" | "complete" | "failed";
  error?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  username: string;
}

export interface IUser extends IRegister {
  cart: ICart;
  status?: "idle" | "loading" | "complete" | "failed";
  error?: string | undefined;
}

export interface IAuth {
  token: string | null;
  isAuthenticated: boolean;
  user?: IUser;
  status: "idle" | "loading" | "complete" | "failed";
  error?: string;
}
