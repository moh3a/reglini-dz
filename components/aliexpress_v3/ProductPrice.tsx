import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { IDropshipperProductDetails } from "../../types/AETypes";

const ProductPrice = ({
  product,
  selectedVariation,
  converter,
}: {
  product: IDropshipperProductDetails["result"];
  selectedVariation: any;
  converter: (price: number) => number | undefined;
}) => {
  const t = useTranslations("AEProduct");
  const [showDollar, setShowDollar] = useState(false);
  let [currency, setCurrency] = useState("");

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
                {showDollar
                  ? Math.round(
                      (Number(selectedVariation.sku_price) -
                        (Number(selectedVariation.sku_price) *
                          product.price.discount) /
                          100) *
                        100
                    ) / 100
                  : converter(
                      Number(selectedVariation.sku_price) -
                        (Number(selectedVariation.sku_price) *
                          product.price.discount) /
                          100
                    )}{" "}
                {currency}
              </div>
              <div>
                <span className="line-through mr-2">
                  {showDollar
                    ? selectedVariation.sku_price
                    : converter(Number(selectedVariation.sku_price))}{" "}
                  {currency}
                </span>{" "}
                -{product.price.discount}%
              </div>
            </div>
          ) : (
            <div className="border-aliexpress bg-aliexpress text-white py-2 px-6 text-xl font-bold">
              {showDollar
                ? selectedVariation.sku_price
                : converter(Number(selectedVariation.sku_price))}{" "}
              {currency}
            </div>
          )
        ) : product.price.hasDiscount &&
          product.price.discount &&
          product.price.discountedPrice ? (
          <div className="flex flex-col justify-center items-center border-aliexpress bg-aliexpress text-white  py-2 px-6 text-xl font-bold">
            <div>
              {showDollar ? (
                <span>
                  {product.price.originalPrice.min ===
                  product.price.originalPrice.max ? (
                    product.price.discountedPrice.min
                  ) : (
                    <>
                      {product.price.discountedPrice.min} -{" "}
                      {product.price.discountedPrice.max}
                    </>
                  )}
                </span>
              ) : (
                <span>
                  {product.price.originalPrice.min ===
                  product.price.originalPrice.max ? (
                    converter(product.price.discountedPrice.min)
                  ) : (
                    <>
                      {converter(product.price.discountedPrice.min)} -{" "}
                      {product.price.discountedPrice.max &&
                        converter(product.price.discountedPrice.max)}
                    </>
                  )}
                </span>
              )}{" "}
              {currency}
            </div>
            <div>
              <span className="line-through mr-2">
                {showDollar ? (
                  <span>
                    {product.price.originalPrice.min ===
                    product.price.originalPrice.max ? (
                      product.price.originalPrice.min
                    ) : (
                      <>
                        {product.price.originalPrice.min} -{" "}
                        {product.price.originalPrice.max}
                      </>
                    )}
                  </span>
                ) : (
                  <span>
                    {product.price.originalPrice.min ===
                    product.price.originalPrice.max ? (
                      converter(product.price.originalPrice.min)
                    ) : (
                      <>
                        {converter(product.price.originalPrice.min)} -{" "}
                        {product.price.originalPrice.max &&
                          converter(product.price.originalPrice.max)}
                      </>
                    )}
                  </span>
                )}{" "}
                {currency}
              </span>{" "}
              -{product.price.discount}%
            </div>
          </div>
        ) : (
          <div className="border-aliexpress bg-aliexpress text-white py-2 px-6 text-xl font-bold">
            {showDollar ? (
              <span>
                {product.price.originalPrice.min ===
                product.price.originalPrice.max ? (
                  product.price.originalPrice.min
                ) : (
                  <>
                    {product.price.originalPrice.min} -{" "}
                    {product.price.originalPrice.max}
                  </>
                )}
              </span>
            ) : (
              <span>
                {product.price.originalPrice.min ===
                product.price.originalPrice.max ? (
                  converter(product.price.originalPrice.min)
                ) : (
                  <>
                    {converter(product.price.originalPrice.min)} -{" "}
                    {product.price.originalPrice.max &&
                      converter(product.price.originalPrice.max)}
                  </>
                )}
              </span>
            )}{" "}
            {currency}
          </div>
        )}
      </div>
      <div className="w-full flex justify-center mb-6">
        <button
          className="underline text-orange-600 hover:text-orange-800"
          onClick={() =>
            showDollar ? setShowDollar(false) : setShowDollar(true)
          }
        >
          {showDollar ? t("priceInDinars") : t("priceInDollar")}
        </button>
      </div>
    </>
  );
};

export default ProductPrice;
