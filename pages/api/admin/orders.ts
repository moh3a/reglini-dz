import type { NextApiResponse } from "next";
import nc from "next-connect";

import dbConnect from "../../../config/db";
import User from "../../../models/User";
import CheckSession from "../../../utils/checkSession";
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
      const data = await User.find()
        .select("email picture orders")
        .map((res) => {
          let u: any[] = [];
          res.map((user: any) => {
            if (user.orders.length > 0) {
              user.orders.map((order: any) => {
                if (
                  !order.payment.hasTimedOut &&
                  !order.payment.isPaymentConfirmed
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

      if (data) {
        res.status(200).json({
          success: true,
          message: `These are the orders made by users.`,
          data,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `No orders made.`,
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

export default handler;
