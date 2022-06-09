import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LocalCurrencyConverter } from "../../utils/methods";

const ProductPrice = ({ product, selectedVariation }: any) => {
  const t = useTranslations("AEProduct");
  const [showEuro, setShowEuro] = useState(false);
  let [currency, setCurrency] = useState("");

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
                  {showEuro
                    ? selectedVariation.price.app.discountedPrice.value
                    : LocalCurrencyConverter(
                        selectedVariation.price.app.discountedPrice.value,
                        "DZDEUR"
                      )}{" "}
                  {currency}
                </div>
                <div className="text-xs lg:text-sm">
                  <span className="line-through mr-4">
                    {showEuro
                      ? selectedVariation.price.app.originalPrice.value
                      : LocalCurrencyConverter(
                          selectedVariation.price.app.originalPrice.value,
                          "DZDEUR"
                        )}{" "}
                    {currency}
                  </span>{" "}
                  {selectedVariation.price.app.discountPercentage}% {t("off")}
                </div>
              </div>
            ) : (
              <>
                {showEuro
                  ? selectedVariation.price.app.originalPrice.value
                  : LocalCurrencyConverter(
                      selectedVariation.price.app.originalPrice.value,
                      "DZDEUR"
                    )}{" "}
                {currency}
              </>
            )}
          </>
        ) : product.hasSinglePrice ? (
          <>
            {product.price.app.hasDiscount ? (
              <div className="bg-red-400 hover:bg-red-500 text-center font-bold text-gray-100 px-6 py-2">
                <div>
                  {showEuro
                    ? product.price.app.discountedPrice.value
                    : LocalCurrencyConverter(
                        product.price.app.discountedPrice.value,
                        "DZDEUR"
                      )}{" "}
                  {currency}
                </div>
                <div className="text-xs lg:text-sm">
                  <span className="line-through mr-4">
                    {showEuro
                      ? product.price.app.originalPrice.value
                      : LocalCurrencyConverter(
                          product.price.app.originalPrice.value,
                          "DZDEUR"
                        )}{" "}
                    {currency}
                  </span>{" "}
                  {product.price.app.discountPercentage}% {t("off")}
                </div>
              </div>
            ) : (
              <>
                {" "}
                {showEuro
                  ? product.price.app.originalPrice.value
                  : LocalCurrencyConverter(
                      product.price.app.originalPrice.value,
                      "DZDEUR"
                    )}{" "}
                {currency}
              </>
            )}
          </>
        ) : (
          <>
            {product.priceSummary.app.hasDiscount ? (
              <div className="bg-red-400 hover:bg-red-500 text-center font-bold text-gray-100 px-6 py-2">
                <div>
                  {showEuro
                    ? product.priceSummary.app.discountedPrice.min.value
                    : LocalCurrencyConverter(
                        product.priceSummary.app.discountedPrice.min.value,
                        "DZDEUR"
                      )}{" "}
                  {currency} -{" "}
                  {showEuro
                    ? product.priceSummary.app.discountedPrice.max.value
                    : LocalCurrencyConverter(
                        product.priceSummary.app.discountedPrice.max.value,
                        "DZDEUR"
                      )}{" "}
                  {currency}
                </div>
                <div className="text-xs lg:text-sm">
                  <span className="line-through mr-4">
                    {showEuro
                      ? product.priceSummary.app.originalPrice.min.value
                      : LocalCurrencyConverter(
                          product.priceSummary.app.originalPrice.min.value,
                          "DZDEUR"
                        )}{" "}
                    {currency} -{" "}
                    {showEuro
                      ? product.priceSummary.app.originalPrice.max.value
                      : LocalCurrencyConverter(
                          product.priceSummary.app.originalPrice.max.value,
                          "DZDEUR"
                        )}{" "}
                    {currency}
                  </span>{" "}
                  {product.priceSummary.app.discountPercentage}% {t("off")}
                </div>
              </div>
            ) : (
              <>
                {showEuro
                  ? product.priceSummary.app.originalPrice.min.value
                  : LocalCurrencyConverter(
                      product.priceSummary.app.originalPrice.min.value,
                      "DZDEUR"
                    )}{" "}
                {currency} -{" "}
                {showEuro
                  ? product.priceSummary.app.originalPrice.max.value
                  : LocalCurrencyConverter(
                      product.priceSummary.app.originalPrice.max.value,
                      "DZDEUR"
                    )}{" "}
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
