// get products
// https://developers.aliexpress.com/en/doc.htm?docId=45803&docType=2

require("dotenv").config();
import dbConnect from "../../../../../config/db";
import { TopClient } from "../../../../../lib/api/topClient";
import nc from "next-connect";
import type { NextApiResponse, NextApiRequest } from "next";
import { IAEError } from "../../../../../utils/AETypes";

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
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const {
    product,
    shippingAddress,
  }: { product: Product; shippingAddress: ShippingAddress } = req.body;
  try {
    client.execute(
      "aliexpress.trade.buy.placeorder",
      {
        session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
        param_place_order_request4_open_api_d_t_o: `{"logistics_address":{"country":"DZ","province":"${shippingAddress.province}","city":"${shippingAddress.city}","zip":"${shippingAddress.zipCode}","address":"${shippingAddress.addressLine1}","full_name":"${shippingAddress.name}","phone_country":"+213","mobile_no":"${shippingAddress.mobilePhone}"},"product_items":[{"product_count":${product.quantity},"product_id":"${product.productId}","sku_attr":"${product.sku}","logistics_service_name":"${product.carrierId}","order_memo":"${product.orderMemo}"}]}`,
      },
      (error: IAEError, response: IPlaceOrderResponse) => {
        if (!error) {
          console.log(response);
          // if (response.result.is_success) {
          //   res.status(200).json({
          //     success: true,
          //     message: "Successfully create the order.",
          //   });
          // } else if (
          //   response.result.error_code ===
          //   "B_DROPSHIPPER_DELIVERY_ADDRESS_VALIDATE_FAIL"
          // ) {
          //   res.status(200).json({
          //     success: false,
          //     message: "The address provided was not validated.",
          //   });
          // } else if (response.result.error_code === "INVENTORY_HOLD_ERROR") {
          //   res.status(200).json({
          //     success: false,
          //     message: "Held inventory may be insufficient.",
          //   });
          // } else {
          //   res.status(200).json({
          //     success: false,
          //     message: "This is a stange error. Check with admin.",
          //   });
          // }
        } else res.status(200).json({ success: false, error });
      }
    );
  } catch (error: any) {
    res.status(500).json({ error, success: false });
  }
});

export default handler;
