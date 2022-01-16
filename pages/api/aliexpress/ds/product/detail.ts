require("dotenv").config();
const jwt = require("jsonwebtoken");
import nc from "next-connect";
import type { NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { TopClient } from "../../../../../lib/api/topClient";
import User from "../../../../../models/User";
import Currency from "../../../../../models/Currency";
import Finance from "../../../../../models/Finance";
import dbConnect from "../../../../../config/db";
import { IExtendedAPIRequest, IUser } from "../../../../../utils/types";
import {
  IAEError,
  IDSapiProductDetails,
  IShippingInformation,
} from "../../../../../utils/AETypes";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_DS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_DS_APP_SECRET,
});

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { id, locale } = req.body;

    const session: IUser | null = await getSession({ req });
    let aesession: any;
    let aeop_freight_calculate_result_for_buyer_d_t_o_list: IShippingInformation;

    const rate = await Currency.findOne({ exchange: "DZDEUR" }).select("live");
    const commission = await Finance.findOne().select("commission");

    client.execute(
      "aliexpress.logistics.buyer.freight.calculate",
      {
        session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
        param_aeop_freight_calculate_for_buyer_d_t_o: `{"country_code": "DZ","product_id": "${id}","product_num": 1,"send_goods_country_code": "CN","price_currency": "EUR"}`,
      },
      function (error: IAEError, response: any) {
        if (!error) {
          if (response.result.success) {
            aeop_freight_calculate_result_for_buyer_d_t_o_list =
              response.result
                .aeop_freight_calculate_result_for_buyer_d_t_o_list;
          }
        }
      }
    );

    try {
      if (session && session.user) {
        const email = session.user.email;
        const account = session.user.type;
        let provider: IUser["user.provider"];
        if (account === "oauth") {
          provider = session.user.provider;
        }
        const user = await User.findOne({
          email,
          account,
          provider: provider || undefined,
        });
        if (user.aeCredentials && user.aeCredentials.token) {
          const decoded = jwt.verify(
            user.aeCredentials.token,
            process.env.JWT_SECRET
          );
          aesession = decoded.session;
          client.execute(
            "aliexpress.ds.product.get",
            {
              session: aesession.access_token,
              product_id: id,
              ship_to_country: "DZ",
              target_currency: "EUR",
              target_language: locale,
            },
            function (error: IAEError, response: IDSapiProductDetails) {
              if (!error) {
                if (response.rsp_code === "200") {
                  response.result.aeop_freight_calculate_result_for_buyer_d_t_o_list =
                    aeop_freight_calculate_result_for_buyer_d_t_o_list;
                  res.status(200).json({
                    success: true,
                    data: response.result,
                    rate: rate.live.parallel.sale,
                    commission: commission.commission,
                    dropshipper: false,
                    message: "Successfully retrieved product details.",
                  });
                }
              } else res.status(500).json({ success: false, message: error });
            }
          );
        } else {
          client.execute(
            "aliexpress.postproduct.redefining.findaeproductbyidfordropshipper",
            {
              session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
              local_country: "DZ",
              local_language: locale,
              product_id: id,
            },
            function (error: IAEError, response: any) {
              if (!error) {
                response.result.aeop_freight_calculate_result_for_buyer_d_t_o_list =
                  aeop_freight_calculate_result_for_buyer_d_t_o_list;
                res.status(200).json({
                  success: true,
                  data: response.result,
                  rate: rate.live.parallel.sale,
                  commission: commission.commission,
                  dropshipper: true,
                  message: "Successfully retrieved product details.",
                });
              } else res.status(500).json({ success: false, message: error });
            }
          );
        }
      } else {
        client.execute(
          "aliexpress.postproduct.redefining.findaeproductbyidfordropshipper",
          {
            session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
            local_country: "DZ",
            local_language: locale,
            product_id: id,
          },
          function (error: IAEError, response: any) {
            if (!error) {
              response.result.aeop_freight_calculate_result_for_buyer_d_t_o_list =
                aeop_freight_calculate_result_for_buyer_d_t_o_list;
              res.status(200).json({
                success: true,
                data: response.result,
                rate: rate.live.parallel.sale,
                commission: commission.commission,
                dropshipper: true,
                message: "Successfully retrieved product details.",
              });
            } else res.status(500).json({ success: false, message: error });
          }
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  });

export default handler;
