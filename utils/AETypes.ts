export interface IDropshipperProductDetails {
  result: {
    aeop_freight_calculate_result_for_buyer_d_t_o_list: IShippingInformation;
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
    properties: IProductProperties[];
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
  };
  rsp_msg: string;
  rsp_code: string;
}

export interface IBasicProductDetails {
  result: {
    aeop_freight_calculate_result_for_buyer_d_t_o_list: IShippingInformation;
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
    properties: IProductProperties[];
  };
  rsp_msg: string;
  rsp_code: string;
}

export interface IProductProperties {
  id?: string;
  name?: string;
  values: [
    {
      id?: string;
      name?: string;
      hasImage?: boolean;
      imageUrl?: string;
      thumbnailImageUrl?: string;
    }
  ];
}

export interface IShippingInformation {
  aeop_freight_calculate_result_for_buyer_dto: [
    {
      error_code: number;
      estimated_delivery_time: string;
      freight: {
        amount: string;
        cent: number;
        currency_code: string;
      };
      service_name: number;
    }
  ];
}

export interface IShippingInformationResponse {
  aeop_freight_calculate_result_for_buyer_d_t_o_list: {
    aeop_freight_calculate_result_for_buyer_dto: [
      {
        error_code: number;
        estimated_delivery_time: string;
        freight: {
          amount: string;
          cent: number;
          currency_code: string;
        };
        service_name: number;
      }
    ];
  };
  error_desc: string;
  success: boolean;
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

export interface MainAEProduct {
  productUrl: string;
  productId: string;
  statusId: string;
  status: string;
  currency: string;
  locale: string;
  shipTo: string;
  title: string;
  totalStock: number;
  totalOrders: number;
  wishlistCount: number;
  unitName: string;
  unitNamePlural: string;
  unitsPerProduct: number;
  hasPurchaseLimit: boolean;
  maxPurchaseLimit: number;
  processingTimeInDays: number;
  productImages: [string];
  productCategory: {
    id: string;
    name: string;
    path: [
      {
        id: string;
        name: string;
        level: number;
      }
    ];
  };
  seller: {
    storeUrl: string;
    storeId: string;
    storeName: string;
    sellerId?: string;
    companyId?: string;
  };
  sellerDetails: {
    sellerDetailsUrl: string;
    summary: {
      contactPerson: string;
      country: string;
      openingDate: string;
    };
    detailedRatings: {
      itemAsDescribed: {
        totalCount: number;
        rating: {
          value: number;
          percentage: number;
        };
        otherSellersDifference: number;
      };
      communication: {
        totalCount: number;
        rating: {
          value: number;
          percentage: number;
        };
        otherSellersDifference: number;
      };
      shippingSpeed: {
        totalCount: number;
        rating: {
          value: number;
          percentage: number;
        };
        otherSellersDifference: number;
      };
    };
    ratingsHistory: {
      total: {
        positive: {
          count: number;
          percentage: number;
        };
        neutral: {
          count: number;
          percentage: number;
        };
        negative: {
          count: number;
          percentage: number;
        };
      };
      lastMonth: {
        positive: {
          count: number;
          percentage: number;
        };
        neutral: {
          count: number;
          percentage: number;
        };
        negative: {
          count: number;
          percentage: number;
        };
      };
      lastThreeMonths: {
        positive: {
          count: number;
          percentage: number;
        };
        neutral: {
          count: number;
          percentage: number;
        };
        negative: {
          count: number;
          percentage: number;
        };
      };
      lastSixMonths: {
        positive: {
          count: number;
          percentage: number;
        };
        neutral: {
          count: number;
          percentage: number;
        };
        negative: {
          count: number;
          percentage: number;
        };
      };
    };
  };
  hasSinglePrice: boolean;
  price: {
    web: {
      originalPrice: { value: number; display: string };
      hasDiscount: boolean;
      discountPercentage: number;
      discountedPrice: { value: number; display: string };
      hasBulkPrice: boolean;
      bulkMinQuantity: number;
      bulkDiscountPercentage: number;
      bulkPrice: { value: number; display: string };
    };
    app: {
      originalPrice: { value: number; display: string };
      hasDiscount: boolean;
      discountPercentage: number;
      discountedPrice: { value: number; display: string };
      hasBulkPrice: boolean;
      bulkMinQuantity: number;
      bulkDiscountPercentage: number;
      bulkPrice: { value: number; display: string };
    };
  };
  hasAttributes: boolean;
  attributes: [
    {
      id: string;
      name: string;
      value: {
        id: string;
        name: string;
      };
    }
  ];
  hasReviewsRatings: boolean;
  reviewsRatings: {
    totalCount: number;
    averageRating: number;
    positiveRatings?: {
      count: number;
      percentage: number;
    };
    negativeRatings?: {
      count: number;
      percentage: number;
    };
    neutralRatings?: {
      count: number;
      percentage: number;
    };
    fiveStar?: {
      count: number;
      percentage: number;
    };
    fourStar?: {
      count: number;
      percentage: number;
    };
    threeStar?: {
      count: number;
      percentage: number;
    };
    twoStar?: {
      count: number;
      percentage: number;
    };
    oneStar?: {
      count: number;
      percentage: number;
    };
  };
  hasProperties: true;
  properties: [
    {
      id: string;
      name: string;
      values: [
        {
          id: string;
          name: string;
          hasImage: boolean;
          imageUrl?: string;
          thumbnailImageUrl?: string;
        }
      ];
    }
  ];
  hasVariations: boolean;
  variations: [
    {
      sku: string;
      stock: number;
      imageUrl: string;
      thumbnailImageUrl: string;
      properties: [
        {
          id: string;
          name: string;
          value: {
            id: string;
            name: string;
          };
        }
      ];
      price: {
        web: {
          originalPrice: { value: number; display: string };
          hasDiscount: boolean;
          discountPercentage: number;
          discountedPrice: { value: number; display: string };
          hasBulkPrice: boolean;
          bulkMinQuantity: number;
          bulkDiscountPercentage: number;
          bulkPrice: { value: number; display: string };
        };
        app: {
          originalPrice: { value: number; display: string };
          hasDiscount: boolean;
          discountPercentage: number;
          discountedPrice: { value: number; display: string };
          hasBulkPrice: boolean;
          bulkMinQuantity: number;
          bulkDiscountPercentage: number;
          bulkPrice: { value: number; display: string };
        };
      };
    }
  ];
  shipping: {
    shipFrom: string;
    isAvailableForSelectedCountries: boolean;
    currency: string;
    carriers: [
      {
        company: {
          id: string;
          name: string;
        };
        hasTracking: boolean;
        price: {
          value: number;
        };
        hasDiscount: boolean;
        discountPercentage: number;
        estimatedDeliveryDate: string;
        deliveryTimeInDays: {
          min: number;
          max: number;
        };
      }
    ];
  };
  htmlDescription: string;
}

export interface MainAESearch {
  totalCount: number;
  numberOfPages: number;
  resultsPerPage: number;
  currency: string;
  items: [
    {
      productId: string;
      title: string;
      imageUrl: string;
      totalOrders: number;
      averageRating: number;
      shippingMinPrice: {
        value: number;
      };
      productMinPrice: {
        value: number;
      };
    }
  ];
  availableShipFromCountries: [string];
  refiningAttributes: [
    {
      id: string;
      name: string;
      values: [
        {
          id: string;
          name: string;
          imageUrl: string;
        }
      ];
    }
  ];
  refiningSearchCategories: [
    {
      id: string;
      name: string;
      hasChildCategories: boolean;
      childCategories: [
        {
          id: string;
          name: string;
        }
      ];
    }
  ];
}

export interface MainAEOrder {
  orderDetailsUrl: string;
  orderId: string;
  shipTo: string;
  storeId: string;
  storeName: string;
  sellerId: string;
  companyId: string;
  creationTime: string;
  currency: string;
  totalPrice: {
    productsPrice: {
      value: number;
      display: string;
    };
    shippingPrice: {
      value: number;
      display: string;
    };
    fullOrderPrice: {
      value: number;
      display: string;
    };
  };
  isPaid: boolean;
  paymentTime: string;
  status: string;
  statusDescription: string;
  endReason: string;
  msUntilAutomaticClosingDate: number;
  shippingAddress: {
    name: string;
    countryCode: string;
    province: string;
    city: string;
    zipCode: string;
    addressLine1: string;
    addressLine2: string;
    mobilePhone: string;
  };
  products: [
    {
      productId: string;
      title: string;
      subStatus: string;
      productImage: string;
      unitName: string;
      quantity: number;
      memo: string;
      price: {
        total: {
          value: number;
          display: string;
        };
        unit: {
          value: number;
          display: string;
        };
      };
      hasRefund: boolean;
      carrier: {
        id: string;
        name: string;
      };
      processingTimeInDays: number;
      deliveryTimeInDays: {
        min: number;
        max: number;
      };
      shippingPrice: {
        value: number;
        display: string;
      };
      hasIssue: boolean;
      issueStatus: string;
      sku: string;
      properties: [
        {
          id: string;
          name: string;
          value: {
            id: string;
            name: string;
          };
        }
      ];
      daysUntilBuyerProtectionStart: number;
      daysUntilBuyerProtectionEnd: number;
      canOpenDispute: boolean;
      canSubmitDispute: boolean;
      canSubmitIssue: boolean;
      canSubmitWarranty: boolean;
    }
  ];
  isFrozen: boolean;
  frozenStatus: string;
  canTracking: boolean;
  canConfirmReceived: boolean;
  canResume: boolean;
  canCancel: boolean;
  canEvaluate: boolean;
  canAdditionalEval: boolean;
  canPhotoReview: boolean;
  canPay: boolean;
  canExtend: boolean;
  maxExtendDays: number;
}

export interface MainAETracking {
  isTrackingAvailable: boolean;
  packages: [
    {
      caption: string;
      readyForDispatchTime: string;
      deliveryTimeRange: {
        min: string;
        max: string;
      };
      shipTo: string;
      shipFrom: string;
      trackingNumber: string;
      officialWebsite: string;
      trackingUrl: string;
      carrier: {
        id: string;
        name: string;
      };
      progressPercentage: number;
      hasCheckpoints: boolean;
      checkpoints: [
        {
          location: string;
          date: string;
          caption: string;
          icon: string;
        }
      ];
    }
  ];
  shippingAddress: {
    name: string;
    countryCode: string;
    province: string;
    city: string;
    zipCode: string;
    addressLine1: string;
    addressLine2: string;
    mobilePhone: string;
  };
}
