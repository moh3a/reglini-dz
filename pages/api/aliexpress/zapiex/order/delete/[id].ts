require("dotenv").config();
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import User from "../../../../../../models/User";
import { IUser } from "../../../../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const session: IUser | null = await getSession({ req });

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

        const index = user.orders.findIndex(
          (order: any) => order.orderId === id
        );
        if (index === -1) {
          res.status(404).json({ success: false, message: "Order not found." });
        } else {
          if (user.orders[index].canCancel) {
            await axios({
              method: "POST",
              url: "https://api.zapiex.com/v3/order/cancel",
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
                user.orders.splice(index, 1);
                user.save(function (err: any, result: any) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.status(200).json({
                      success: true,
                      data: user,
                      message: "Order successfully cancelled and deleted.",
                    });
                  }
                });
              })
              .catch((err) => {
                res.status(400).json({ success: false, message: err });
              });
          } else {
            user.orders.splice(index, 1);
            user.save(function (err: any, result: any) {
              if (err) {
                console.log(err);
              } else {
                res.status(200).json({
                  success: true,
                  data: user,
                  message: "Archived order successfully deleted.",
                });
              }
            });
          }
        }
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", succes: false });
  }
}
