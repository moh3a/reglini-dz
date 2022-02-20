import type { NextApiResponse } from "next";
import nc from "next-connect";

import User from "../../../../models/User";
import { cartCount, cartSubtotal } from "../../../../utils/cartMethods";
import CheckSession from "../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../types";

const handler = nc();
handler
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .delete(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    const index = data.cart.cartItems.findIndex(
      (item: any) => item.productId === id
    );
    if (index === -1) {
      res
        .status(404)
        .json({ success: false, message: "Item not found in cart." });
    }
    data.cart.cartItems.splice(index, 1);
    data.cart.count = cartCount(data.cart.cartItems);
    data.cart.subtotal = cartSubtotal(data.cart.cartItems);
    await data.save();
    res.status(200).json({
      success: true,
      message: "Item successfully deleted from cart.",
      data,
    });
  })
  .patch(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { quantity } = req.body;
    const { id } = req.query;
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    const index = data.cart.cartItems.findIndex(
      (item: any) => item.productId === id
    );
    if (index === -1) {
      res
        .status(404)
        .json({ success: false, message: "Item not found in cart." });
    }
    data.cart.cartItems[index].quantity = quantity;
    data.cart.cartItems[index].totalPrice =
      Math.ceil(
        (data.cart.cartItems[index].price +
          data.cart.cartItems[index].shippingPrice) *
          quantity *
          100
      ) / 100;
    data.cart.count = cartCount(data.cart.cartItems);
    data.cart.subtotal = cartSubtotal(data.cart.cartItems);
    await data.save();
    res.status(200).json({
      success: true,
      data,
      message: "Item quantity has been updated.",
    });
  });

export default handler;
