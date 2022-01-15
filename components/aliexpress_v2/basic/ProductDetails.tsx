/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

import { IDSapiProductDetails } from "../../../utils/AETypes";
import StoreInfo from "./StoreInfo";
import ProductImages from "./ProductImages";
import ProductProperties from "./ProductProperties";

const ProductDetails = ({
  product,
  converter,
}: {
  product: IDSapiProductDetails["result"];
  converter: (price: number) => number | undefined;
}) => {
  const router = useRouter();
  const t = useTranslations("Aliexpress");
  const [showImage, setShowImage] = useState("/placeholder.png");

  const images = product.ae_multimedia_info_dto?.image_urls?.split(";");
  useEffect(() => {
    if (images) setShowImage(images[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-red-50 dark:bg-grim text-gray-800 dark:text-yellow-100 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div
          className={`lg:w-4/5 mx-auto flex flex-wrap ${
            router.locale === "ar" && "flex-row-reverse"
          }`}
        >
          {product.ae_multimedia_info_dto && (
            <ProductImages
              product={product}
              showImage={showImage}
              setShowImage={setShowImage}
            />
          )}

          <div
            className={`lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ${
              router.locale === "ar" && "text-right"
            }`}
          >
            {product.ae_item_properties &&
              product.ae_item_properties.logistics_info_d_t_o && (
                <h1 className="font-bold">
                  {
                    product.ae_item_properties.logistics_info_d_t_o[0]
                      .attr_value
                  }
                </h1>
              )}
            {product.ae_item_base_info_dto && (
              <p className="text-lg font-semibold">
                {product.ae_item_base_info_dto.subject}
              </p>
            )}
          </div>
        </div>

        <ProductProperties product={product} />

        <StoreInfo product={product} />
        {product.ae_item_base_info_dto && (
          <div className="hidden md:flex md:flex-col md:justify-center md:items-center">
            <h2 className="font-bold text-xl">Seller&apos;s Description</h2>
            <div className="hidden md:block md:max-w-screen-md md:overflow-hidden">
              {product.ae_item_base_info_dto.detail &&
                parse(product.ae_item_base_info_dto.detail)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default ProductDetails;
