import dbConnect from "../../../config/db";
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import { cartCount, cartSubtotal } from "../../../utils/cartMethods";
import { IUser } from "../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const session: IUser | null = await getSession({ req });
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      if (!session) {
        res.status(403).json({ message: "Unauthorized to access this part." });
      } else if (session.user) {
        const email = session.user.email;
        const account = session.user.type;
        let provider: IUser["user.provider"];
        if (account === "oauth") {
          provider = session.user.provider;
        }
        const data = await User.findOne({
          account,
          email,
          provider: provider || undefined,
        });
        if (!data)
          res
            .status(400)
            .json({ success: false, message: "User does not exist" });
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
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: error.message, status: 500 });
    }
  } else if (req.method === "PATCH") {
    const { quantity } = req.body;
    try {
      if (!session) {
        res.status(403).json({ message: "Unauthorized to access this part." });
      } else if (session.user) {
        const email = session.user.email;
        const account = session.user.type;
        let provider: IUser["user.provider"];
        if (account === "oauth") {
          provider = session.user.provider;
        }
        const data = await User.findOne({
          account,
          email,
          provider: provider || undefined,
        });
        if (!data)
          res
            .status(400)
            .json({ success: false, message: "User does not exist" });
        const index = data.cart.cartItems.findIndex(
          (item: any) => item.productId === id
        );
        if (index === -1) {
          res
            .status(404)
            .json({ success: false, message: "Item not found in cart." });
        }
        data.cart.cartItems[index].quantity = quantity;
        data.cart.count = cartCount(data.cart.cartItems);
        data.cart.subtotal = cartSubtotal(data.cart.cartItems);
        await data.save();
        res.status(200).json({
          success: true,
          data,
          message: "Item quantity has been updated.",
        });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: error.message, status: 500 });
    }
  } else {
    res
      .status(400)
      .json({ message: "Page doesn't exist.", success: false, status: 400 });
  }
}
