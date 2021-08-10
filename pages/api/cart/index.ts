import dbConnect from "../../../config/db";

import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

import User from "../../../models/User";
import { ICartItem } from "../../../types/authType";
import { cartCount, cartSubtotal } from "../../../utils/cartMethods";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const token = req.headers.authorization;
  // Check for token
  if (!token)
    return res.status(401).json({
      message: "No token, authorization denied",
      success: false,
      status: 401,
    });
  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // Add user from payload
  const { id } = decoded;

  if (req.method === "GET") {
    try {
      const data = await User.findById(id);
      if (!data) throw Error("User does not exist");
      res.status(200).json({ success: true, data, status: 200 });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, success: true, status: 500 });
    }
  }
  //
  else if (req.method === "POST") {
    const {
      productId,
      name,
      slug,
      price,
      imageUrl,
      countInStock,
      quantity,
    }: ICartItem = req.body;
    try {
      const data = await User.findById(id);
      if (!data) throw Error("User does not exist");
      const index = data.cart.cartItems.findIndex(
        (item: any) => item.productId.toString() === productId
      );
      if (index === -1) {
        data.cart.cartItems.push({
          productId,
          name,
          slug,
          price,
          imageUrl,
          countInStock,
          quantity,
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
        message: "Item added to cart.",
        status: 201,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, success: false, status: 500 });
    }
  }
  //
  else {
    res
      .status(400)
      .json({ message: "Page doesn't exist.", success: false, status: 400 });
  }
}
