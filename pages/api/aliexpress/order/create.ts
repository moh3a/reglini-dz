require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getSession } from "next-auth/client";

import User from "../../../../models/User";
import { IUser } from "../../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: IUser | null = await getSession({ req });
  const { products, shippingAddress } = req.body;

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

        axios({
          method: "POST",
          url: "https://api.zapiex.com/v3/order/create",
          headers: {
            "x-api-key": process.env.ZAPIEX_KEY,
            "Content-Type": "application/json",
          },
          data: {
            username: process.env.ALIEXPRESS_USERNAME,
            password: process.env.ALIEXPRESS_PASSWORD,
            currency: "EUR",
            products,
            shippingAddress,
          },
        })
          .then((response) => {
            let orderIds = response.data.data.orderIds;
            orderIds.forEach((id: any) => {
              user.orders.push({
                orderId: id,
                products,
                shippingAddress,
                currency: "EUR",
              });
            });
            user.save(function (err: any, result: any) {
              if (err) {
                console.log(err);
              } else {
                res.status(200).json({
                  success: true,
                  data: user,
                  message: "Order successfully submitted and awaiting payment.",
                });
              }
            });
          })
          .catch((err) => {
            res
              .status(200)
              .json({
                success: false,
                message: "Your order cannot be confirmed.",
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
