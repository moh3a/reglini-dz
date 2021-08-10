import dbConnect from "../../../config/db";

import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

import User from "../../../models/User";
import { cartCount, cartSubtotal } from "../../../utils/cartMethods";
import ErrorResponse from "../../../utils/errorResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const query = req.query;

  const token = req.headers.authorization;
  // Check for token
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // Add user from payload
  const { id } = decoded;

  if (req.method === "DELETE") {
    try {
      const data = await User.findById(id);
      const index = data.cart.cartItems.findIndex(
        (item: any) => item.productId.toString() === query.id
      );
      if (index === -1) {
        new ErrorResponse("Couldn't find item in cart.", 204);
      }
      const itemId = data.cart.cartItems[index]._id;
      data.cart.cartItems.remove({ _id: itemId });
      data.cart.count = cartCount(data.cart.cartItems);
      data.cart.subtotal = cartSubtotal(data.cart.cartItems);
      await data.save();
      res.status(200).json({
        success: true,
        message: "Item successfully deleted from cart.",
        data,
        status: 200,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: error.message, status: 500 });
    }
  }
  //
  else if (req.method === "PATCH") {
    const { quantity } = req.body;
    try {
      const data = await User.findById(id);
      const index = data.cart.cartItems.findIndex(
        (item: any) => item.productId.toString() === query.id
      );
      if (index === -1) {
        new ErrorResponse("Couldn't find item in cart.", 204);
      }
      data.cart.cartItems[index].quantity = quantity;
      data.cart.count = cartCount(data.cart.cartItems);
      data.cart.subtotal = cartSubtotal(data.cart.cartItems);
      await data.save();
      res.status(200).json({
        success: true,
        data,
        message: "Item quantity has been updated.",
        status: 200,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: error.message, status: 500 });
    }
  }
  //
  else {
    res
      .status(400)
      .json({ message: "Page doesn't exist.", success: false, status: 400 });
  }
}
