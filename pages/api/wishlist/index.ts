import dbConnect from "../../../config/db";
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const session = await getSession({ req });

  if (req.method === "POST") {
    const { productId, name, price, imageUrl } = req.body;
    try {
      if (!session) {
        res.status(403).json({ message: "Unauthorized to access this part." });
      } else if (session.user) {
        if (session.user.type === "credentials") {
          const data = await User.findOne({
            account: session.user.type,
            email: session.user.email,
          });
          if (!data) throw Error("User does not exist");
          const index = data.wishlist.findIndex(
            (item: any) => item.productId === productId
          );
          if (index === -1) {
            data.wishlist.push({
              productId,
              name,
              price,
              imageUrl,
            });
            await data.save();
            res.status(201).json({
              success: true,
              data,
              message: "Item successfully added to wishlist.",
              status: 201,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "Item is already in the wishlist.",
            });
          }
        } else if (session.user.type === "oauth") {
          const data = await User.findOne({
            account: session.user.type,
            provider: session.user.provider,
            email: session.user.email,
          });
          if (!data) throw Error("User does not exist");
          const index = data.wishlist.findIndex(
            (item: any) => item.productId.toString() === productId
          );
          if (index === -1) {
            data.wishlist.push({
              productId,
              name,
              price,
              imageUrl,
            });
            await data.save();
            res.status(201).json({
              success: true,
              data,
              message: "Item added to wishlist.",
              status: 201,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "Item is already in the wishlist.",
            });
          }
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message, success: false, status: 500 });
    }
  } else {
    res
      .status(400)
      .json({ message: "Page doesn't exist.", success: false, status: 400 });
  }
}
