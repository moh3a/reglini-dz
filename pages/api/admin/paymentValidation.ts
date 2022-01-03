import axios from "axios";
import type { NextApiResponse } from "next";
import nc from "next-connect";

import dbConnect from "../../../config/db";
import User from "../../../models/User";
import Finance from "../../../models/Finance";
import CheckSession from "../../../utils/checkSession";
import sendEmail from "../../../utils/sendEmail";
import { IExtendedAPIRequest } from "../../../utils/types";

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) => {
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    if (data.role !== "admin") {
      res.status(200).json({
        success: false,
        message: "Unauthorized to access this part.",
      });
    } else {
      next();
    }
  })
  .get(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    try {
      const paid = await User.find()
        .select("email picture orders")
        .map((res) => {
          let u: any[] = [];
          res.map((user: any) => {
            if (user.orders.length > 0) {
              user.orders.map((order: any) => {
                if (
                  !order.payment.hasTimedOut &&
                  !order.payment.isPaymentConfirmed &&
                  order.payment.receipt
                ) {
                  u.push({
                    picture: user.picture,
                    userId: user._id,
                    email: user.email,
                    order: order,
                  });
                }
              });
            }
          });
          return u;
        });

      if (paid) {
        res.status(200).json({
          success: true,
          message: `These users submitted payments and need to be checked.`,
          data: paid,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `No payments submitted.`,
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    try {
      const { accepted, userId, orderId } = req.body;
      const finance = await Finance.findOne();
      const user = await User.findById(userId);
      const index = user.orders.findIndex(
        (order: any) => order.orderId === orderId
      );
      if (index === -1) {
        res.status(200).json({ success: false, message: "Order not found." });
      } else {
        if (accepted) {
          user.orders[index].payment.isPaymentConfirmed = true;
          user.orders[index].payment.wasDeclined = false;
          finance.acceptedPayments.push({ userId, orderId });
          finance.ordersMoneySumDinars += user.orders[index].product.totalPrice;
          finance.ordersMoneySumEuros +=
            user.orders[index].totalPrice.fullOrderPrice.value;
          await finance.save();
          let message = `
          <h1>Your order was successfull</h1>
          <small>Product: ${user.orders[index].product.name} </small>
          <small>Order ID: ${user.orders[index].orderId}</small>
          <p>The payment has been confirmed, check your order status whenever you want. Tracking will be available once the product was shipped.</p>
          `;
          await sendEmail({
            from: process.env.SENDGRID_FROM,
            to: user.email,
            subject: "Order confirmed and payment was successfull",
            text: message,
          });
        } else {
          const d1 = new Date(user.orders[index].createdAt);
          const d2 = new Date();
          const timeSpent = d2.getTime() - d1.getTime();
          const timeRemaining = 172800000 - timeSpent;
          if (timeRemaining < 0 && user.orders[index].canCancel) {
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
                  }
                });
              })
              .catch((err: any) => console.log(err));
          }
          user.orders[index].payment.receipt = undefined;
          user.orders[index].payment.paymentMethod = undefined;
          user.orders[index].payment.paymentTime = undefined;
          user.orders[index].payment.wasDeclined = true;
          user.orders[index].payment.isPaymentConfirmed = false;
        }
        user.save(function (err: any, result: any) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({
              success: true,
              message: "Payment's validation updated.",
            });
          }
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

export default handler;
