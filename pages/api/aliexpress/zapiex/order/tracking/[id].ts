require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getSession } from "next-auth/client";

import User from "../../../../../../models/User";
import { IUser } from "../../../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: IUser | null = await getSession({ req });
  const { id } = req.query;

  if (req.method === "POST") {
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
        const user = await User.findOne({
          account,
          email,
          provider: provider || undefined,
        });
        if (!user)
          res
            .status(400)
            .json({ success: false, message: "User does not exist" });

        await axios({
          method: "POST",
          url: "https://api.zapiex.com/v3/order/tracking",
          headers: {
            "x-api-key": process.env.ZAPIEX_KEY,
            "Content-Type": "application/json",
          },
          data: {
            username: process.env.ALIEXPRESS_USERNAME,
            password: process.env.ALIEXPRESS_PASSWORD,
            orderId: id,
          },
        })
          .then((response) => {
            let data = response.data.data;
            const index = user.orders.findIndex(
              (order: any) => order.orderId === id
            );
            if (index === -1) {
              res
                .status(200)
                .json({ success: false, message: "No order with this ID." });
            } else {
              user.orders[index].tracking = data;
              user.save(function (error: any, result: any) {
                if (error) {
                  console.log(error);
                } else {
                  res.status(200).json({
                    success: true,
                    message: "Successfully retrieved tracking for your order.",
                    data: user,
                  });
                }
              });
            }
          })
          .catch((error) => {
            res.status(200).json({
              success: false,
              message: "Could not retrieve tracking for your order.",
            });
          });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", succes: false });
  }
}
