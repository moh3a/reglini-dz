import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

import { IDropshipperProductDetails } from "../../types/AETypes";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommission,
  fetchCurrencyRate,
  IFinance,
  selectFinance,
} from "../../utils/redux/financeSlice";

const ProductPrice = ({
  product,
  selectedVariation,
}: {
  product: IDropshipperProductDetails["result"];
  selectedVariation: any;
}) => {
  const t = useTranslations("AEProduct");
  const [showDollar, setShowDollar] = useState(false);
  let [currency, setCurrency] = useState("DZD");
  const dispatch = useDispatch();
  const { rate, commission }: IFinance = useSelector(selectFinance);

  const LocalCurrencyConverter = useCallback(
    (price: number, exchange: "DZDEUR" | "DZDUSD" | "DZDGBP") => {
      let currency: number = 0;
      if (rate && commission) {
        const rateIndex = rate.findIndex((c) => c.exchange === exchange);
        if (rateIndex !== -1) currency = rate[rateIndex].live.parallel.sale;
        return (
          Math.ceil((price * currency + price * currency * commission) / 10) *
          10
        );
      } else {
        dispatch(fetchCommission());
        dispatch(fetchCurrencyRate());
      }
    },
    [dispatch, commission, rate]
  );

  const formatPrice = useCallback(
    (price: string | number) => {
      if (showDollar) {
        return Math.round(Number(price) * 100) / 100;
      } else {
        return LocalCurrencyConverter(Number(price), "DZDUSD");
      }
    },
    [showDollar, LocalCurrencyConverter]
  );

  useEffect(() => {
    if (showDollar) {
      setCurrency("$");
    } else {
      setCurrency("DZD");
    }
  }, [showDollar]);

  return (
    <>
      <div className="mt-6 flex justify-center items-center">
        {selectedVariation && selectedVariation.id ? (
          product.price.hasDiscount &&
          product.price.discount &&
          selectedVariation.sku_price ? (
            <div className="flex flex-col justify-center items-center border-aliexpress bg-aliexpress text-white  py-2 px-6 text-xl font-bold">
              <div>
                {formatPrice(
                  Number(selectedVariation.sku_price) -
                    (Number(selectedVariation.sku_price) *
                      product.price.discount) /
                      100
                )}{" "}
                {currency}
              </div>
              <div>
                <span className="line-through mr-2">
                  {formatPrice(selectedVariation.sku_price)} {currency}
                </span>{" "}
                -{product.price.discount}%
              </div>
            </div>
          ) : (
            <div className="border-aliexpress bg-aliexpress text-white py-2 px-6 text-xl font-bold">
              {formatPrice(selectedVariation.sku_price)} {currency}
            </div>
          )
        ) : product.price.hasDiscount &&
          product.price.discount &&
          product.price.discountedPrice ? (
          <div className="flex flex-col justify-center items-center border-aliexpress bg-aliexpress text-white  py-2 px-6 text-xl font-bold">
            <div>
              <span>
                {product.price.originalPrice.min ===
                product.price.originalPrice.max ? (
                  formatPrice(product.price.discountedPrice.min)
                ) : (
                  <>
                    {formatPrice(product.price.discountedPrice.min)} -{" "}
                    {formatPrice(product.price.discountedPrice.max as number)}
                  </>
                )}
              </span>{" "}
              {currency}
            </div>
            <div>
              <span className="line-through mr-2">
                <span>
                  {product.price.originalPrice.min ===
                  product.price.originalPrice.max ? (
                    formatPrice(product.price.originalPrice.min)
                  ) : (
                    <>
                      {formatPrice(product.price.originalPrice.min)} -{" "}
                      {formatPrice(product.price.originalPrice.max as number)}
                    </>
                  )}
                </span>{" "}
                {currency}
              </span>{" "}
              -{product.price.discount}%
            </div>
          </div>
        ) : (
          <div className="border-aliexpress bg-aliexpress text-white py-2 px-6 text-xl font-bold">
            <span>
              {product.price.originalPrice.min ===
              product.price.originalPrice.max ? (
                formatPrice(product.price.originalPrice.min)
              ) : (
                <>
                  {formatPrice(product.price.originalPrice.min)} -{" "}
                  {formatPrice(product.price.originalPrice.max as number)}
                </>
              )}
            </span>{" "}
            {currency}
          </div>
        )}
      </div>
      <div className="w-full flex justify-center mb-6">
        <button
          className="underline text-orange-600 hover:text-orange-800"
          onClick={() => setShowDollar(!showDollar)}
        >
          {showDollar ? t("priceInDinars") : t("priceInDollar")}
        </button>
      </div>
    </>
  );
};

export default ProductPrice;
