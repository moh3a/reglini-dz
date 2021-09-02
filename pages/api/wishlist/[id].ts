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
        const email = session.user.email;
        const account = session.user.type;
        let provider = "";
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
