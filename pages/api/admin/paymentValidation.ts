import axios from "axios";
import type { NextApiResponse } from "next";
import nc from "next-connect";

import User from "../../../models/User";
import CheckSession from "../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../utils/types";

const handler = nc();
handler
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
      const users = await User.find()
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

      if (users) {
        res.status(200).json({
          success: true,
          message: `These users submitted payments and need to be checked.`,
          data: users,
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

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session: IUser | null = await getSession({ req });
//   if (!session) {
//     res.status(200).json({
//       success: false,
//       message: "Unauthorized to access this part.",
//     });
//   } else if (session.user) {
//     const email = session.user.email;
//     const account = session.user.type;
//     let provider: IUser["user.provider"];
//     if (account === "oauth") {
//       provider = session.user.provider;
//     }
//     const data = await User.findOne({
//       account,
//       email,
//       provider: provider || undefined,
//     });
//     if (!data) {
//       res.status(200).json({
//         success: false,
//         message: "No user was found.",
//       });
//     }
//     if (data.role !== "admin") {
// res.status(200).json({
//   success: false,
//   message: "Unauthorized to access this part.",
// });
//     } else {
//       if (req.method === "GET") {
// try {
//   const users = await User.find()
//     .select("email picture orders")
//     .map((res) => {
//       let u: any[] = [];
//       res.map((user: any) => {
//         if (user.orders.length > 0) {
//           user.orders.map((order: any) => {
//             if (
//               !order.payment.hasTimedOut &&
//               !order.payment.isPaymentConfirmed &&
//               order.payment.receipt
//             ) {
//               u.push({
//                 picture: user.picture,
//                 userId: user._id,
//                 email: user.email,
//                 order: order,
//               });
//             }
//           });
//         }
//       });
//       return u;
//     });

//   if (users) {
//     res.status(200).json({
//       success: true,
//       message: `These users submitted payments and need to be checked.`,
//       data: users,
//     });
//   } else {
//     res.status(200).json({
//       success: true,
//       message: `No payments submitted.`,
//     });
//   }
// } catch (error: any) {
//   res.status(500).json({ message: error.message });
// }
//       } else if (req.method === "POST") {
// try {
//   const { accepted, userId, orderId } = req.body;
//   const user = await User.findById(userId);
//   const index = user.orders.findIndex(
//     (order: any) => order.orderId === orderId
//   );
//   if (index === -1) {
//     res
//       .status(200)
//       .json({ success: false, message: "Order not found." });
//   } else {
//     if (accepted) {
//       user.orders[index].payment.isPaymentConfirmed = true;
//       user.orders[index].payment.wasDeclined = false;
//     } else {
//       const d1 = new Date(user.orders[index].createdAt);
//       const d2 = new Date();
//       const timeSpent = d2.getTime() - d1.getTime();
//       const timeRemaining = 172800000 - timeSpent;
//       if (timeRemaining < 0 && user.orders[index].canCancel) {
//         await axios({
//           method: "POST",
//           url: "https://api.zapiex.com/v3/order/cancel",
//           headers: {
//             "x-api-key": process.env.ZAPIEX_KEY,
//             "Content-Type": "application/json",
//           },
//           data: {
//             username: process.env.ALIEXPRESS_USERNAME,
//             password: process.env.ALIEXPRESS_PASSWORD,
//             orderId: user.orders[index].orderId,
//           },
//         })
//           .then(() => {
//             user.orders[index] = {
//               orderId: user.orders[index].orderId,
//               product: undefined,
//               shippingAddress: undefined,
//               tracking: undefined,
//               payment: { hasTimedOut: true },
//             };
//             user.save(function (err: any, result: any) {
//               if (err) {
//                 console.log(err);
//               }
//             });
//           })
//           .catch((err: any) => console.log(err));
//       }
//       user.orders[index].payment.receipt = undefined;
//       user.orders[index].payment.paymentMethod = undefined;
//       user.orders[index].payment.paymentTime = undefined;
//       user.orders[index].payment.wasDeclined = true;
//       user.orders[index].payment.isPaymentConfirmed = false;
//     }
//     user.save(function (err: any, result: any) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.status(200).json({
//           success: true,
//           message: "Payment's validation updated.",
//         });
//       }
//     });
//   }
// } catch (error: any) {
//   res.status(500).json({ message: error.message });
// }
//       } else {
//         res.status(400).json({ message: "Page doesn't exist." });
//       }
//     }
//   }
// }
