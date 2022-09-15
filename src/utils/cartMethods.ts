// MODULE USED FOR BASIC OPERATIONS IN /API/USER/CART

export const cartCount = (items: any) => {
  let quantities = items.map((item: any) => {
    return (item = item.quantity);
  });
  const count = quantities.reduce((x: any, y: any) => x + y, 0);
  return count;
};

export const cartSubtotal = (items: any) => {
  return items.reduce(
    (price: any, item: any) => item.price * item.quantity + price,
    0
  );
};
