import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  fetchCommission,
  fetchCurrencyRate,
  IFinance,
  selectFinance,
} from "../../utils/redux/financeSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductPrice = ({ product, selectedVariation }: any) => {
  const t = useTranslations("AEProduct");
  const [showEuro, setShowEuro] = useState(false);
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
      if (showEuro) {
        return Math.round(Number(price) * 100) / 100;
      } else {
        return LocalCurrencyConverter(Number(price), "DZDEUR");
      }
    },
    [showEuro, LocalCurrencyConverter]
  );

  useEffect(() => {
    if (showEuro) {
      setCurrency("€");
    } else {
      setCurrency("DZD");
    }
  }, [showEuro]);

  return (
    <>
      <div className="flex justify-center mt-6 title-font font-medium text-2xl text-gray-800 dark:text-gray-100">
        {selectedVariation && selectedVariation.sku ? (
          <>
            {selectedVariation.price.app.hasDiscount ? (
              <div className="bg-red-400 hover:bg-red-500 text-center font-bold text-gray-100 px-6 py-2">
                <div>
                  {formatPrice(
                    selectedVariation.price.app.discountedPrice.value
                  )}{" "}
                  {currency}
                </div>
                <div className="text-xs lg:text-sm">
                  <span className="line-through mr-4">
                    {formatPrice(
                      selectedVariation.price.app.originalPrice.value
                    )}{" "}
                    {currency}
                  </span>{" "}
                  {selectedVariation.price.app.discountPercentage}% {t("off")}
                </div>
              </div>
            ) : (
              <>
                {formatPrice(selectedVariation.price.app.originalPrice.value)}{" "}
                {currency}
              </>
            )}
          </>
        ) : product.hasSinglePrice ? (
          <>
            {product.price.app.hasDiscount ? (
              <div className="bg-red-400 hover:bg-red-500 text-center font-bold text-gray-100 px-6 py-2">
                <div>
                  {formatPrice(product.price.app.discountedPrice.value)}{" "}
                  {currency}
                </div>
                <div className="text-xs lg:text-sm">
                  <span className="line-through mr-4">
                    {formatPrice(product.price.app.originalPrice.value)}{" "}
                    {currency}
                  </span>{" "}
                  {product.price.app.discountPercentage}% {t("off")}
                </div>
              </div>
            ) : (
              <>
                {formatPrice(product.price.app.originalPrice.value)} {currency}
              </>
            )}
          </>
        ) : (
          <>
            {product.priceSummary.app.hasDiscount ? (
              <div className="bg-red-400 hover:bg-red-500 text-center font-bold text-gray-100 px-6 py-2">
                <div>
                  {formatPrice(
                    product.priceSummary.app.discountedPrice.min.value
                  )}{" "}
                  {currency} -{" "}
                  {formatPrice(
                    product.priceSummary.app.discountedPrice.max.value
                  )}{" "}
                  {currency}
                </div>
                <div className="text-xs lg:text-sm">
                  <span className="line-through mr-4">
                    {formatPrice(
                      product.priceSummary.app.originalPrice.min.value
                    )}{" "}
                    {currency} -{" "}
                    {formatPrice(
                      product.priceSummary.app.originalPrice.max.value
                    )}{" "}
                    {currency}
                  </span>{" "}
                  {product.priceSummary.app.discountPercentage}% {t("off")}
                </div>
              </div>
            ) : (
              <>
                {formatPrice(product.priceSummary.app.originalPrice.min.value)}{" "}
                {currency} -{" "}
                {formatPrice(product.priceSummary.app.originalPrice.max.value)}{" "}
                {currency}
              </>
            )}
          </>
        )}
      </div>
      <div className="w-full flex justify-center">
        <button
          className="underline text-orange-600 hover:text-orange-800"
          onClick={() => (showEuro ? setShowEuro(false) : setShowEuro(true))}
        >
          {showEuro ? t("priceInDinars") : t("priceInEuro")}
        </button>
      </div>
    </>
  );
};

export default ProductPrice;
