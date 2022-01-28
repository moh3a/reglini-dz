// get products
// https://developers.aliexpress.com/en/doc.htm?docId=45803&docType=2

require("dotenv").config();
import type { NextApiResponse } from "next";
import nc from "next-connect";

import dbConnect from "../../../../../config/db";
import { TopClient } from "../../../../../lib/api/topClient";
import User from "../../../../../models/User";
import CheckSession from "../../../../../utils/checkSession";
import {
  IAEError,
  IAEOrderTrackingResponse,
} from "../../../../../utils/AETypes";
import { IExtendedAPIRequest } from "../../../../../utils/types";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_DS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_DS_APP_SECRET,
  REST_URL: process.env.ALIEXPRESS_API_URL,
});

export interface IOrderDetailsResponse {
  result: {
    gmt_create: string;
    order_status: string;
    logistics_status: string;
    order_amount: {
      amount: string;
      currency_code: string;
    };
    child_order_list: {
      aeop_child_order_info: [
        {
          product_id: number;
          product_price: {
            amount: string;
            currency_code: string;
          };
          product_name: string;
          product_count: number;
        }
      ];
    };
    logistics_info_list: {
      aeop_order_logistics_info: [
        {
          logistics_no: string;
          logistics_service: string;
        }
      ];
    };
    store_info: {
      store_id: number;
      store_name: string;
      store_url: string;
    };
  };
}

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    if (!user)
      res.status(400).json({ success: false, message: "User does not exist" });
    const { orderId } = req.body;
    try {
      client.execute(
        "aliexpress.ds.trade.order.get",
        {
          session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
          order_id: orderId,
        },
        (errorDetails: IAEError, responseDetails: IOrderDetailsResponse) => {
          if (!errorDetails) {
            const index = user.orders.findIndex(
              (order: any) => order.orderId === orderId
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
                // data.canCancel &&
                !user.orders[index].receipt
              ) {
                //
                // cancel order here
                //
              } else {
                user.orders[index].details = responseDetails.result;
                if (
                  responseDetails.result.logistics_status !== "NO_LOGISTICS" &&
                  responseDetails.result.logistics_info_list &&
                  responseDetails.result.logistics_info_list
                    .aeop_order_logistics_info
                ) {
                  user.orders[index].tracking.hasTracking = true;
                } else {
                  user.orders[index].tracking.hasTracking = false;
                }
                if (user.orders[index].tracking.hasTracking) {
                  client.execute(
                    "aliexpress.logistics.ds.trackinginfo.query",
                    {
                      session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
                      logistics_no:
                        responseDetails.result.logistics_info_list
                          .aeop_order_logistics_info[0].logistics_no,
                      origin: "ESCROW",
                      out_ref: orderId,
                      service_name:
                        responseDetails.result.logistics_info_list
                          .aeop_order_logistics_info[0].logistics_service,
                      to_area: "DZ",
                    },
                    function (
                      errorTracking: IAEError,
                      responseTracking: IAEOrderTrackingResponse
                    ) {
                      if (!errorTracking && responseTracking.result_success) {
                        user.orders[index].tracking.details =
                          responseTracking.details.details;
                        user.orders[index].tracking.website =
                          responseTracking.official_website;
                        user.save(function (error: any, result: any) {
                          if (error) {
                            console.log(error);
                          } else {
                            res.status(200).json({
                              success: true,
                              message:
                                "Successfully retrieved your order details.",
                              data: user,
                            });
                          }
                        });
                      } else
                        res.status(200).json({
                          succes: false,
                          message: "Error fetching tracking data.",
                        });
                    }
                  );
                } else {
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
                }
              }
            }
          } else
            res.status(200).json({
              succes: false,
              message: "Error fetching order details.",
            });
        }
      );
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  });

export default handler;