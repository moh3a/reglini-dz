export interface IDSProductDetails {
  aeop_ae_product_s_k_us: {
    aeop_ae_product_sku: [
      {
        sku_stock: boolean;
        sku_price: string;
        sku_code: string;
        ipm_sku_stock: number;
        id: string;
        currency_code: string;
        aeop_s_k_u_propertys: {
          aeop_sku_property: [
            {
              sku_property_id: number;
              sku_image: string;
              property_value_id_long: number;
              property_value_definition_name: string;
              sku_property_value: string;
              sku_property_name: string;
            }
          ];
        };
        barcode: string;
        offer_sale_price: string;
        offer_bulk_sale_price: string;
        sku_bulk_order: number;
        s_k_u_available_stock: number;
      }
    ];
  };
  detail: string;
  is_success: boolean;
  product_unit: number;
  ws_offline_date: string;
  ws_display: string;
  category_id: number;
  aeop_a_e_multimedia: {
    aeop_a_e_videos: {
      aeop_ae_video: [
        {
          poster_url: string;
          media_type: string;
          media_status: string;
          media_id: number;
          ali_member_id: number;
        }
      ];
    };
  };
  owner_member_id: string;
  product_status_type: string;
  aeop_ae_product_propertys: {
    aeop_ae_product_property: [
      {
        attr_value_unit: string;
        attr_value_start: string;
        attr_value_id: number;
        attr_value_end: string;
        attr_value: string;
        attr_name_id: number;
        attr_name: string;
      }
    ];
  };
  gross_weight: string;
  delivery_time: number;
  ws_valid_num: number;
  gmt_modified: string;
  error_message: string;
  package_type: boolean;
  aeop_national_quote_configuration: {
    configuration_type: string;
    configuration_data: string;
  };
  subject: string;
  base_unit: number;
  package_length: number;
  mobile_detail: string;
  package_height: number;
  package_width: number;
  currency_code: string;
  gmt_create: string;
  image_u_r_ls: string;
  product_id: number;
  error_code: number;
  product_price: string;
  item_offer_site_sale_price: string;
  total_available_stock: number;
  store_info: {
    communication_rating: string;
    item_as_descriped_rating: string;
    shipping_speed_rating: string;
    store_id: number;
    store_name: string;
  };
  evaluation_count: number;
  avg_evaluation_rating: string;
  order_count: number;
}

export interface IDSapiProductDetails {
  result: {
    ae_item_base_info_dto?: {
      product_id?: number;
      category_id?: number;
      subject?: string;
      currency_code?: string;
      product_status_type?: string;
      ws_display?: string;
      ws_offline_date?: string;
      gmt_create?: string;
      gmt_modified?: string;
      owner_member_seq_long?: number;
      evaluation_count?: string;
      avg_evaluation_rating?: string;
      detail?: string;
      mobile_detail?: string;
    };
    ae_item_sku_info_dtos?: {
      ae_item_sku_info_d_t_o?: [
        {
          id?: string;
          sku_stock?: boolean;
          sku_price?: string;
          sku_code?: string;
          ipm_sku_stock?: number;
          currency_code?: string;
          ae_sku_property_dtos?: {
            ae_sku_property_d_t_o?: [
              {
                sku_property_id?: number;
                sku_property_name?: string;
                sku_property_value?: string;
                property_value_id?: number;
                property_value_definition_name?: string;
                sku_image?: string;
              }
            ];
          };
          barcode?: string;
          offer_sale_price?: string;
          offer_bulk_sale_price?: string;
          sku_bulk_order?: number;
          sku_available_stock?: number;
        }
      ];
    };
    ae_multimedia_info_dto?: {
      ae_video_dtos?: {
        ae_video_d_t_o?: [
          {
            ali_member_id?: number;
            media_id?: number;
            media_status?: string;
            media_type?: string;
            poster_url?: string;
          }
        ];
      };
      image_urls?: string;
    };
    package_info_dto?: {
      package_length?: number;
      package_height?: number;
      package_width?: number;
      gross_weight?: string;
      base_unit?: number;
      package_type?: true;
      product_unit?: number;
    };
    logistics_info_dto?: {
      delivery_time?: number;
      ship_to_country?: string;
    };
    ae_item_properties?: {
      logistics_info_d_t_o?: [
        {
          attr_name_id?: number;
          attr_name?: string;
          attr_value_id?: number;
          attr_value?: string;
          attr_value_start?: string;
          attr_value_end?: string;
          attr_value_unit?: string;
        }
      ];
    };
    ae_store_info?: {
      store_id?: number;
      store_name?: string;
      item_as_described_rating?: string;
      communication_rating?: string;
      shipping_speed_rating?: string;
    };
  };
  rsp_msg: string;
  rsp_code: string;
}

export interface IAEAffiliateProductsResponse {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: IAEAffiliateProductsResult;
  };
}

export interface IAEAffiliateProductDetailsResponse {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: IAEAffiliateProductDetailsResult;
  };
}

export interface IAEAffiliateProductsResult {
  current_page_no: number;
  current_record_count: number;
  products: {
    product: [IAffiliateProduct];
  };
  total_page_no: number;
  total_record_count: number;
}

export interface IAEAffiliateProductDetailsResult {
  current_record_count: number;
  products: {
    product: [IAffiliateProduct];
  };
}

export interface IAffiliateProduct {
  app_sale_price?: string;
  app_sale_price_currency?: string;
  commission_rate?: string;
  discount?: string;
  evaluate_rate?: string;
  first_level_category_id?: number;
  first_level_category_name?: string;
  lastest_volume?: number;
  hot_product_commission_rate?: string;
  original_price?: string;
  original_price_currency?: string;
  platform_product_type?: "TMALL" | "ALL" | "PLAZA";
  product_detail_url?: string;
  product_id?: number;
  product_main_image_url?: string;
  product_small_image_urls?: {
    string: [string];
  };
  product_title?: string;
  product_video_url?: string;
  promotion_link?: string;
  sale_price?: string;
  sale_price_currency?: string;
  second_level_category_id?: number;
  second_level_category_name?: string;
  shop_id?: number;
  shop_url?: string;
  target_app_sale_price?: string;
  target_app_sale_price_currency?: string;
  target_original_price?: string;
  target_original_price_currency?: string;
  target_sale_price?: string;
  target_sale_price_currency?: string;
  relevant_market_commission_rate?: string;
  promo_code_info?: {
    promo_code?: string;
    code_campaigntype?: string;
    code_value?: string;
    code_availabletime_start?: string;
    code_availabletime_end?: string;
    code_mini_spend?: string;
    code_quantity?: string;
    code_promotionurl?: string;
  };
  ship_to_days?: string;
}

export interface IAEError {
  msg: string;
  code: number;
  sub_msg: string;
  sub_code: string;
}
