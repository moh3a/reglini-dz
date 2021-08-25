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
  const { id } = req.query;

  if (req.method === "DELETE") {
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
            (item: any) => item.productId === id
          );
          if (index === -1) {
            res
              .status(404)
              .json({ success: false, message: "Item not found in wishlist." });
          }
          data.wishlist.splice(index, 1);
          await data.save();
          res.status(200).json({
            success: true,
            message: "Item successfully deleted from wishlist.",
            data,
          });
        } else if (session.user.type === "oauth") {
          const data = await User.findOne({
            account: session.user.type,
            provider: session.user.provider,
            email: session.user.email,
          });
          const index = data.wishlist.findIndex(
            (item: any) => item.productId === id
          );
          if (index === -1) {
            res
              .status(404)
              .json({ success: false, message: "Item not found in wishlist." });
          }
          data.wishlist.splice(index, 1);
          await data.save();
          res.status(200).json({
            success: true,
            message: "Item successfully deleted from cart.",
            data,
          });
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
