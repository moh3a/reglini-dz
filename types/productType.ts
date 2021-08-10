export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  countInStock: number;
  imageUrl: string;
  status: "idle" | "loading" | "complete" | "failed";
  error: string | undefined;
}

export interface IProducts {
  products: Array<IProduct>;
  status: "idle" | "loading" | "complete" | "failed";
  error: string | undefined;
}
