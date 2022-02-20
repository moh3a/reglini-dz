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
import { IExtendedAPIRequest, IUser } from "../../../../../types";
import {
  IAEError,
  IDropshipperProductDetails,
  IBasicProductDetails,
  IShippingInformation,
  IProductProperties,
} from "../../../../../types/AETypes";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_DS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_DS_APP_SECRET,
  REST_URL: process.env.ALIEXPRESS_API_URL,
});

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { id, locale } = req.body;
    let properties: IProductProperties[] = [];

    let user: any;
    const session: IUser | null = await getSession({ req });
    if (session && session.user) {
      const email = session.user.email;
      const account = session.user.type;
      let provider: IUser["user.provider"];
      if (account === "oauth") {
        provider = session.user.provider;
      }
      user = await User.findOne({
        email,
        account,
        provider: provider || undefined,
      });
    }
    let aesession: any;
    let aeop_freight_calculate_result_for_buyer_d_t_o_list: IShippingInformation;

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
            try {
              if (user && user.aeCredentials && user.aeCredentials.token) {
                const decoded = jwt.verify(
                  user.aeCredentials.token,
                  process.env.JWT_SECRET
                );
                aesession = decoded.session;
                //
                //
                //
                //
                // basic account product details
                client.execute(
                  "aliexpress.ds.product.get",
                  {
                    session: aesession.access_token,
                    product_id: id,
                    ship_to_country: "DZ",
                    target_currency: "EUR",
                    target_language: locale,
                  },
                  async (error: IAEError, response: IBasicProductDetails) => {
                    if (!error) {
                      const rate = await Currency.findOne({
                        exchange: "DZDEUR",
                      }).select("live");

                      response.result.aeop_freight_calculate_result_for_buyer_d_t_o_list =
                        aeop_freight_calculate_result_for_buyer_d_t_o_list;
                      if (
                        response.result.ae_item_sku_info_dtos &&
                        response.result.ae_item_sku_info_dtos
                          .ae_item_sku_info_d_t_o
                      ) {
                        response.result.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o.map(
                          (variations) => {
                            if (
                              variations.ae_sku_property_dtos &&
                              variations.ae_sku_property_dtos
                                .ae_sku_property_d_t_o
                            ) {
                              variations.ae_sku_property_dtos?.ae_sku_property_d_t_o?.map(
                                (props) => {
                                  const index = properties.findIndex(
                                    (e: any) =>
                                      e.id === props.sku_property_id?.toString()
                                  );
                                  if (index !== -1) {
                                    const exits = properties[index].values.find(
                                      (e) =>
                                        e.id ===
                                        props.property_value_id?.toString()
                                    );
                                    if (!exits)
                                      properties[index].values.push({
                                        id: props.property_value_id?.toString(),
                                        name: props.property_value_definition_name
                                          ? props.property_value_definition_name
                                          : props.property_value_id?.toString(),
                                        hasImage: props.sku_image
                                          ? true
                                          : false,
                                        imageUrl: props.sku_image,
                                        thumbnailImageUrl: props.sku_image,
                                      });
                                  } else {
                                    properties.push({
                                      id: props.sku_property_id?.toString(),
                                      name: props.sku_property_name,
                                      values: [
                                        {
                                          id: props.property_value_id?.toString(),
                                          name: props.property_value_definition_name
                                            ? props.property_value_definition_name
                                            : props.property_value_id?.toString(),
                                          hasImage: props.sku_image
                                            ? true
                                            : false,
                                          imageUrl: props.sku_image,
                                          thumbnailImageUrl: props.sku_image,
                                        },
                                      ],
                                    });
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                      response.result.properties = properties;
                      console.log("euro rate " + rate.live.parallel.sale);
                      if (response.rsp_code === "200") {
                        res.status(200).json({
                          success: true,
                          data: response.result,
                          rate: rate.live.parallel.sale,
                          commission: commission.commission,
                          dropshipper: false,
                          message: "Successfully retrieved product details.",
                        });
                      }
                    } else
                      res.status(500).json({ success: false, message: error });
                  }
                );
              }
              //
              //
              //
              //
              // dropshipper product details
              else {
                client.execute(
                  "aliexpress.postproduct.redefining.findaeproductbyidfordropshipper",
                  {
                    session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
                    local_country: "DZ",
                    local_language: locale,
                    product_id: id,
                  },
                  async (
                    error: IAEError,
                    response: IDropshipperProductDetails
                  ) => {
                    if (!error) {
                      const rate = await Currency.findOne({
                        exchange: "DZDUSD",
                      }).select("live");

                      response.result.aeop_freight_calculate_result_for_buyer_d_t_o_list =
                        aeop_freight_calculate_result_for_buyer_d_t_o_list;
                      if (
                        response.result.aeop_ae_product_s_k_us &&
                        response.result.aeop_ae_product_s_k_us
                          .aeop_ae_product_sku
                      ) {
                        response.result.aeop_ae_product_s_k_us?.aeop_ae_product_sku.map(
                          (variations) => {
                            if (
                              variations.aeop_s_k_u_propertys &&
                              variations.aeop_s_k_u_propertys.aeop_sku_property
                            ) {
                              variations.aeop_s_k_u_propertys?.aeop_sku_property?.map(
                                (props) => {
                                  const index = properties.findIndex(
                                    (e: any) =>
                                      e.id === props.sku_property_id.toString()
                                  );
                                  if (index !== -1) {
                                    const exits = properties[index].values.find(
                                      (e) =>
                                        e.id ===
                                        props.property_value_id_long.toString()
                                    );
                                    if (!exits)
                                      properties[index].values.push({
                                        id: props.property_value_id_long.toString(),
                                        name: props.property_value_definition_name
                                          ? props.property_value_definition_name
                                          : props.property_value_id_long.toString(),
                                        hasImage: props.sku_image
                                          ? true
                                          : false,
                                        imageUrl: props.sku_image,
                                        thumbnailImageUrl: props.sku_image,
                                      });
                                  } else {
                                    properties.push({
                                      id: props.sku_property_id.toString(),
                                      name: props.sku_property_name,
                                      values: [
                                        {
                                          id: props.property_value_id_long.toString(),
                                          name: props.property_value_definition_name
                                            ? props.property_value_definition_name
                                            : props.property_value_id_long.toString(),
                                          hasImage: props.sku_image
                                            ? true
                                            : false,
                                          imageUrl: props.sku_image,
                                          thumbnailImageUrl: props.sku_image,
                                        },
                                      ],
                                    });
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                      response.result.properties = properties;
                      console.log("dollar rate " + rate.live.parallel.sale);
                      res.status(200).json({
                        success: true,
                        data: response.result,
                        rate: rate.live.parallel.sale,
                        commission: commission.commission,
                        dropshipper: true,
                        message: "Successfully retrieved product details.",
                      });
                    } else
                      res.status(500).json({ success: false, message: error });
                  }
                );
              }
            } catch (error: any) {
              console.log(error);
            }
          }
        }
      }
    );
  });

export default handler;
