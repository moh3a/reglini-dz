// MODULE USED FOR BASIC OPERATIONS IN /API/CART

import { ICartItem } from "../types/authType";

export const cartCount = (items: Array<ICartItem>) => {
  let quantities = items.map((item: any) => {
    return (item = item.quantity);
  });
  const count = quantities.reduce((x, y) => x + y, 0);
  return count;
};
//
export const cartSubtotal = (items: Array<ICartItem>) => {
  return items.reduce((price, item) => item.price * item.quantity + price, 0);
};
