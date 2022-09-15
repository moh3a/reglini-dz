import type { NextApiResponse } from "next";
import nc from "next-connect";

import User from "../../../../../models/User";
import { cartCount, cartSubtotal } from "../../../../utils/cartMethods";
import CheckSession from "../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../types";

const handler = nc();
handler
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const {
      productId,
      name,
      price,
      sku,
      imageUrl,
      properties,
      quantity,
      carrierId,
      shippingPrice,
      totalPrice,
    } = req.body;
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    const index = data.cart.cartItems.findIndex(
      (item: any) => item.productId === productId
    );
    if (index === -1) {
      data.cart.cartItems.push({
        productId,
        name,
        price,
        imageUrl,
        sku,
        properties,
        quantity,
        carrierId,
        shippingPrice,
        totalPrice,
      });
    } else {
      data.cart.cartItems[index].quantity = quantity;
    }
    data.cart.count = cartCount(data.cart.cartItems);
    data.cart.subtotal = cartSubtotal(data.cart.cartItems);
    await data.save();
    res.status(201).json({
      success: true,
      data,
      message: "Item successfully added to cart.",
    });
  });

export default handler;
