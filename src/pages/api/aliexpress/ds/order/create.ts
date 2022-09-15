require("dotenv").config();
import nc from "next-connect";
import type { NextApiResponse } from "next";

import dbConnect from "../../../../../../config/db";
import { TopClient } from "../../../../../../lib/api/topClient";
import User from "../../../../../../models/User";
import CheckSession from "../../../../../utils/checkSession";
import { IAEError } from "../../../../../types/AETypes";
import { IExtendedAPIRequest } from "../../../../../types";
import { CancelOrderAfterTimer } from "../../../../../utils/methods";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_DS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_DS_APP_SECRET,
  REST_URL: process.env.ALIEXPRESS_API_URL,
});

export interface IPlaceOrderResponse {
  result: {
    error_code: string;
    error_msg: string;
    order_list: {
      number: [number];
    };
    is_success: boolean;
  };
}
export interface Product {
  productId: string;
  name: string;
  sku: string;
  imageUrl: string;
  price: number;
  shippingPrice: number;
  totalPrice: number;
  properties: [{}];
  quantity: number;
  carrierId: string;
  orderMemo: string;
}
export interface ShippingAddress {
  name: string;
  phoneCountry: string;
  mobilePhone: string;
  addressLine1: string;
  city: string;
  province: string;
  countryCode: string;
  zipCode: string;
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
    const {
      product,
      shippingAddress,
    }: { product: Product; shippingAddress: ShippingAddress } = req.body;

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    if (!user)
      res.status(400).json({ success: false, message: "User does not exist" });

    const placeorder = {
      logistics_address: {
        country: "DZ",
        province: shippingAddress.province,
        city: shippingAddress.city,
        zip: shippingAddress.zipCode,
        address: shippingAddress.addressLine1,
        contact_person: shippingAddress.name,
        full_name: shippingAddress.name,
        phone_country: "+213",
        mobile_no: shippingAddress.mobilePhone,
      },
      product_items: [
        {
          product_count: product.quantity,
          product_id: parseInt(product.productId),
          sku_attr: product.sku,
          logistics_service_name: product.carrierId,
          order_memo: product.orderMemo,
        },
      ],
    };

    try {
      client.execute(
        "aliexpress.trade.buy.placeorder",
        {
          session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
          param_place_order_request4_open_api_d_t_o: JSON.stringify(placeorder),
        },
        (error: IAEError, response: IPlaceOrderResponse) => {
          if (!error) {
            console.log(response);
            if (response.result.is_success) {
              let orderIds = response.result.order_list.number;
              orderIds.map((id) => {
                user.orders.push({
                  orderId: id.toString(),
                  product,
                  shippingAddress,
                  currency: "USD",
                });
                /*
                60000      - for test
                172800000  - 48h for production
                */
                CancelOrderAfterTimer(user, id.toString(), 172800000);
              });
              user.save(function (err: any, result: any) {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).json({
                    success: true,
                    data: user,
                    message:
                      "Order successfully submitted and awaiting payment.",
                  });
                }
              });
            } else if (
              response.result.error_code ===
              "B_DROPSHIPPER_DELIVERY_ADDRESS_VALIDATE_FAIL"
            ) {
              res.status(200).json({
                success: false,
                message: "The address provided was not validated.",
              });
            } else if (response.result.error_code === "INVENTORY_HOLD_ERROR") {
              res.status(200).json({
                success: false,
                message: "Held inventory may be insufficient.",
              });
            } else {
              res.status(200).json({
                success: false,
                message: "This is a stange error. Check with admin.",
              });
            }
          } else res.status(200).json({ success: false, error });
        }
      );
    } catch (error: any) {
      res.status(500).json({ error, success: false });
    }
  });

export default handler;
