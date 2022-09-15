require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getSession } from "next-auth/client";

import User from "../../../../../../../models/User";
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
          url: "https://api.zapiex.com/v3/order/details",
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
              const d1 = new Date(user.orders[index].createdAt);
              const d2 = new Date();
              const timeSpent = d2.getTime() - d1.getTime();
              const timeRemaining = 172800000 - timeSpent;
              if (
                timeRemaining < 0 &&
                data.canCancel &&
                !user.orders[index].receipt
              ) {
                axios({
                  method: "POST",
                  url: "https://api.zapiex.com/v3/order/cancel",
                  headers: {
                    "x-api-key": process.env.ZAPIEX_KEY,
                    "Content-Type": "application/json",
                  },
                  data: {
                    username: process.env.ALIEXPRESS_USERNAME,
                    password: process.env.ALIEXPRESS_PASSWORD,
                    orderId: user.orders[index].orderId,
                  },
                })
                  .then(() => {
                    user.orders[index] = {
                      orderId: user.orders[index].orderId,
                      product: undefined,
                      shippingAddress: undefined,
                      tracking: undefined,
                      payment: { hasTimedOut: true },
                    };
                    user.save(function (err: any, result: any) {
                      if (err) {
                        console.log(err);
                      } else {
                        res.status(200).json({
                          success: false,
                          data: user,
                          message:
                            "Your order order has timedout and has now been cancelled.",
                        });
                      }
                    });
                  })
                  .catch((err: any) => console.log(err));
              } else {
                user.orders[index].status = data.status;
                user.orders[index].orderDetailsUrl = data.orderDetailsUrl;
                user.orders[index].creationTime = data.creationTime;
                user.orders[index].totalPrice = data.totalPrice;
                user.orders[index].paymentTime = data.paymentTime;
                user.orders[index].readyForDispatchTime =
                  data.readyForDispatchTime;
                user.orders[index].isPaid = data.isPaid;
                user.orders[index].isShipped = data.isShipped;
                user.orders[index].isFrozen = data.isFrozen;
                user.orders[index].canResume = data.canResume;
                user.orders[index].canCancel = data.canCancel;
                user.orders[index].endReason = data.endReason;
                axios({
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
                  .then((resp) => {
                    user.orders[index].tracking = resp.data.data;
                    user.save(function (error: any, result: any) {
                      if (error) {
                        console.log(error);
                      } else {
                        res.status(200).json({
                          success: true,
                          message: "Successfully retrieved your order details.",
                          data: user,
                        });
                      }
                    });
                  })
                  .catch((erro) => console.log(erro));
              }
            }
          })
          .catch((err) => {
            res.status(200).json({
              success: false,
              message: "Could not retrieve your order.",
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
