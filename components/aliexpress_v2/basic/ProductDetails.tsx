/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

import { selectUser } from "../../../utils/redux/userSlice";
import { IBasicProductDetails } from "../../../utils/AETypes";
import StoreInfo from "./StoreInfo";
import ProductImages from "./ProductImages";
import ProductProperties from "../ProductProperties";
import ProductReviews from "./ProductReviews";
import ProductQuantity from "./ProductQuantity";
import ProductShipping from "../ProductShipping";
import {
  ActionFeedback,
  BuyProduct,
  ProductToCart,
  ProductToWishlist,
} from "../ProductActions";

const ProductDetails = ({
  product,
  converter,
}: {
  product: IBasicProductDetails["result"];
  converter: (price: number) => number | undefined;
}) => {
  const { user, message } = useSelector(selectUser);
  const router = useRouter();
  const t = useTranslations("Aliexpress");
  const [showImage, setShowImage] = useState("/placeholder.png");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [properties, setProperties] = useState([{ name: "", value: "" }]);
  const [variation, setVariation] =
    useState<({ name: string; value: string } | undefined)[]>();
  const [selectedShipping, setSelectedShipping] = useState(
    product.aeop_freight_calculate_result_for_buyer_d_t_o_list
      .aeop_freight_calculate_result_for_buyer_dto[0]
  );

  const [selectedVariation, setSelectedVariation] = useState<{
    imageUrl: string;
    price: {};
    properties: any[];
    sku: string;
    thumbnailImageUrl: string;
    quantity?: number;
    stock?: number;
  }>();

  const images = product.ae_multimedia_info_dto?.image_urls?.split(";");
  useEffect(() => {
    if (images) setShowImage(images[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product.properties && properties) {
      let inverse = properties.slice().reverse();
      let values = product.properties.map((prop: any) =>
        inverse.find((property: any) => property.name === prop.name)
      );
      setVariation(values);
    }
  }, [product, properties]);

  // useEffect(() => {
  //   if (product.ae_item_sku_info_dtos && product.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o && variation) {
  //     let theOne = {
  //       imageUrl: "",
  //       price: {},
  //       properties: [{}],
  //       sku: "",
  //       thumbnailImageUrl: "",
  //     };
  //     if (product.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o.length > 1) {
  //       product.ae_item_sku_info_dtos.ae_item_sku_info_d_t_o.map(
  //         (varia) => {
  //           let checking: boolean[] = [];
  //           varia.ae_sku_property_dtos?.ae_sku_property_d_t_o?.map(() => checking.push(false));
  //           varia.ae_sku_property_dtos?.ae_sku_property_d_t_o?.map(
  //             (prop, i: number = 0) => {
  //               if (variation) {
  //               const index =
  //                 variation[0] === undefined
  //                   ? -2
  //                   : variation.findIndex((el) => el.value === prop.property_value_definition_name);
  //               if (
  //                 index !== -2 &&
  //                 index !== -1 &&
  //                 variation[index].name === prop.sku_property_name &&
  //                 variation[index].value === prop.property_value_definition_name
  //               ) {
  //                 checking[i] = true;
  //               } else {
  //                 checking[i] = false;
  //               }
  //               i++;}
  //             }
  //           );
  //           if (!checking.includes(false)) theOne = varia;
  //         }
  //       );
  //     }
  //     setSelectedVariation({ ...theOne, quantity });
  //   }
  // }, [product, variation, quantity]);

  return (
    <>
      <section className="bg-red-50 dark:bg-grim text-gray-800 dark:text-yellow-100 body-font">
        <ActionFeedback message={message} error={error} />
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
              <ProductReviews product={product} />
              {product.properties.map((property) => (
                <ProductProperties
                  key={property.id}
                  property={property}
                  setShowImage={setShowImage}
                  setProperties={setProperties}
                />
              ))}
              <ProductQuantity
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <ProductShipping
                product={product}
                setSelectedShipping={setSelectedShipping}
                converter={converter}
              />
              <div className="mt-4 flex">
                {
                  <BuyProduct
                    converter={converter}
                    product={product}
                    user={user}
                    setError={setError}
                    selectedVariation={selectedVariation}
                    selectedShipping={selectedShipping}
                  />
                }
                {
                  <ProductToCart
                    converter={converter}
                    product={product}
                    user={user}
                    setError={setError}
                    selectedVariation={selectedVariation}
                    selectedShipping={selectedShipping}
                  />
                }
                <ProductToWishlist
                  converter={converter}
                  product={product}
                  user={user}
                  setError={setError}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
};
export default ProductDetails;
