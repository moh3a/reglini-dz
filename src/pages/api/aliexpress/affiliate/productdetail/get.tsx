require("dotenv").config();
import dbConnect from "../../../../../../config/db";
import { TopClient } from "../../../../../../lib/api/topClient";
import nc from "next-connect";
import type { NextApiResponse, NextApiRequest } from "next";
import {
  IAEAffiliateProductDetailsResponse,
  IAEError,
  IShippingInformation,
  IDropshipperProductDetails,
  IProductProperties,
  IProductPrice,
} from "../../../../../types/AETypes";
import axios from "axios";

const affiliateclient = new TopClient({
  appkey: process.env.ALIEXPRESS_AFFILIATE_APP_KEY,
  appsecret: process.env.ALIEXPRESS_AFFILIATE_APP_SECRET,
  REST_URL: process.env.ALIEXPRESS_API_URL,
});

const dsclient = new TopClient({
  appkey: process.env.ALIEXPRESS_DS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_DS_APP_SECRET,
  REST_URL: process.env.ALIEXPRESS_API_URL,
});

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { id, locale } = req.body;
  let properties: IProductProperties[] = [];
  let price: IProductPrice = {
    hasDiscount: false,
    discount: 0,
    discountedPrice: { min: 0, max: 0 },
    originalPrice: { min: 0, max: 0 },
  };
  let aeop_freight_calculate_result_for_buyer_d_t_o_list: IShippingInformation;
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // get affiliate product details
  affiliateclient.execute(
    "aliexpress.affiliate.productdetail.get",
    {
      // app_signature: "moh3a",
      fields: "commission_rate,sale_price",
      product_ids: `${id}`,
      target_currency: "USD",
      target_language: locale ? locale.toUpperCase() : "FR",
      tracking_id: "reglinidz",
      country: "DZ",
    },
    async (
      errorAffiliate: IAEError,
      responseAffiliate: IAEAffiliateProductDetailsResponse
    ) => {
      if (
        !errorAffiliate &&
        responseAffiliate.resp_result.result.current_record_count > 0
      ) {
        //
        //
        //
        //
        //
        //
        //
        //
        //
        // get shipping
        dsclient.execute(
          "aliexpress.logistics.buyer.freight.calculate",
          {
            session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
            param_aeop_freight_calculate_for_buyer_d_t_o: `{"country_code": "DZ","product_id": "${id}","product_num": 1,"send_goods_country_code": "CN","price_currency": "USD"}`,
          },
          async (errorShipping: IAEError, responseShipping: any) => {
            if (!errorShipping) {
              if (responseShipping.result.success) {
                aeop_freight_calculate_result_for_buyer_d_t_o_list =
                  responseShipping.result
                    .aeop_freight_calculate_result_for_buyer_d_t_o_list;
                //
                //
                //
                //
                //
                //
                //
                //
                //
                // get ds product details
                dsclient.execute(
                  "aliexpress.postproduct.redefining.findaeproductbyidfordropshipper",
                  {
                    session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
                    local_country: "DZ",
                    local_language: locale,
                    product_id: id,
                  },
                  async (
                    errorDS: IAEError,
                    responseDS: IDropshipperProductDetails
                  ) => {
                    if (!errorDS) {
                      responseDS.result.aeop_freight_calculate_result_for_buyer_d_t_o_list =
                        aeop_freight_calculate_result_for_buyer_d_t_o_list;
                      //
                      //
                      //
                      //
                      //
                      //
                      //
                      //
                      //
                      // create the properties object
                      if (
                        responseDS.result.aeop_ae_product_s_k_us &&
                        responseDS.result.aeop_ae_product_s_k_us
                          .aeop_ae_product_sku
                      ) {
                        responseDS.result.aeop_ae_product_s_k_us?.aeop_ae_product_sku.map(
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
                                          : props.sku_property_value,
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
                                            : props.sku_property_value,
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
                      responseDS.result.properties = properties;
                      //
                      //
                      //
                      //
                      //
                      //
                      //
                      //
                      //
                      // create the price object
                      if (
                        responseAffiliate.resp_result.result
                          .current_record_count > 0 &&
                        responseAffiliate.resp_result.result.products.product[0]
                      ) {
                        let max = 0;
                        let discount = 0;
                        responseDS.result.aeop_ae_product_s_k_us.aeop_ae_product_sku.map(
                          (sku) => {
                            if (max < Number(sku.sku_price)) {
                              max = Number(sku.sku_price);
                            }
                          }
                        );
                        if (
                          responseAffiliate.resp_result.result.products
                            .product[0].discount &&
                          //================================================
                          // this because of the 99% discount  !!!!
                          parseInt(
                            responseAffiliate.resp_result.result.products
                              .product[0].discount
                          ) < 95 &&
                          Number(
                            responseDS.result.aeop_ae_product_s_k_us
                              .aeop_ae_product_sku[0].sku_price
                          ) >
                            Number(
                              responseDS.result.aeop_ae_product_s_k_us
                                .aeop_ae_product_sku[0].offer_sale_price
                            )
                          //================================================
                        ) {
                          price.hasDiscount = true;
                          price.discount = parseInt(
                            responseAffiliate.resp_result.result.products
                              .product[0].discount
                          );
                          price.discountedPrice = {
                            min: Number(
                              responseAffiliate.resp_result.result.products
                                .product[0].target_sale_price
                            ),
                            max:
                              Math.ceil(
                                (max -
                                  max *
                                    (parseInt(
                                      responseAffiliate.resp_result.result
                                        .products.product[0].discount
                                    ) /
                                      100)) *
                                  100
                              ) / 100,
                          };
                          price.originalPrice = {
                            min: Number(
                              responseAffiliate.resp_result.result.products
                                .product[0].original_price
                            ),
                            max,
                          };
                        } else {
                          price.hasDiscount = false;
                          price.originalPrice = {
                            min: Number(
                              responseAffiliate.resp_result.result.products
                                .product[0].original_price
                            ),
                            max,
                          };
                        }
                      }
                      responseDS.result.price = price;

                      // finish everything by adding DS product details to the initial affiliate product details
                      responseAffiliate.resp_result.result.products.product[0].ds_product_details =
                        responseDS["result"];

                      res.status(200).json({
                        success: true,
                        data: responseAffiliate.resp_result.result.products
                          .product[0],
                        message: "Successfully retrieved product details.",
                      });
                    } else {
                      const { data: admin_res } = await axios.get(
                        "https://admin.reglini-dz.com/api/aliexpress/auth"
                      );
                      if (admin_res.success) {
                        res
                          .status(200)
                          .json({
                            success: false,
                            error: errorDS,
                            message: "Please try again in a few minutes.",
                          });
                      } else {
                        res
                          .status(200)
                          .json({ success: false, error: errorDS });
                      }
                    }
                  }
                );
              }
            } else {
              console.log(errorShipping);
              res.status(200).json({ success: false, error: errorShipping });
            }
          }
        );
      } else if (
        responseAffiliate.resp_result.result.current_record_count === 0
      ) {
        res.status(200).json({
          success: false,
          redirect: `/legacyaliexpress/product/${id}`,
        });
      } else
        res.status(200).json({
          success: false,
          redirect: `/legacyaliexpress/product/${id}`,
          error: errorAffiliate,
        });
    }
  );
});

export default handler;
