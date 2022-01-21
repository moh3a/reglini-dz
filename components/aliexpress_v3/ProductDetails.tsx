/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import { selectUser } from "../../utils/redux/userSlice";
import {
  IAffiliateProduct,
  IDropshipperProductDetails,
} from "../../utils/AETypes";
import StoreInfo from "./StoreInfo";
import ProductImages from "./ProductImages";
import ProductProperties from "./ProductProperties";
import ProductReviews from "./ProductReviews";
import ProductQuantity from "./ProductQuantity";
import ProductShipping from "./ProductShipping";
import {
  ActionFeedback,
  BuyProduct,
  ProductToCart,
  ProductToWishlist,
} from "./ProductActions";
import ProductPrice from "./ProductPrice";
import ProductFeatures from "./ProductFeatures";

const ProductDetails = ({
  product,
  converter,
}: {
  product: IAffiliateProduct;
  converter: (price: number) => number | undefined;
}) => {
  const { user, message } = useSelector(selectUser);
  const router = useRouter();
  const t = useTranslations("AEProduct");
  const [showImage, setShowImage] = useState("/placeholder.png");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [properties, setProperties] = useState([{ name: "", value: "" }]);
  const [variation, setVariation] =
    useState<{ name: string; value: string }[]>();
  const [selectedShipping, setSelectedShipping] = useState(
    product.ds_product_details
      .aeop_freight_calculate_result_for_buyer_d_t_o_list
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

  const images = product.ds_product_details.image_u_r_ls.split(";");
  useEffect(() => {
    if (images) setShowImage(images[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product.ds_product_details.properties && properties) {
      let inverse = properties.slice().reverse();
      let values: any = product.ds_product_details.properties.map((prop: any) =>
        inverse.find((property: any) => property.name === prop.name)
      );
      setVariation(values);
    }
  }, [product, properties]);

  useEffect(() => {
    if (
      product.ds_product_details.aeop_ae_product_s_k_us &&
      product.ds_product_details.aeop_ae_product_s_k_us.aeop_ae_product_sku &&
      variation
    ) {
      let theOne: any = {};
      if (
        product.ds_product_details.aeop_ae_product_s_k_us.aeop_ae_product_sku
          .length > 0
      ) {
        product.ds_product_details.aeop_ae_product_s_k_us.aeop_ae_product_sku.map(
          (varia) => {
            let checking: boolean[] = [];
            varia.aeop_s_k_u_propertys.aeop_sku_property.map(() =>
              checking.push(false)
            );
            varia.aeop_s_k_u_propertys.aeop_sku_property.map(
              (prop, i: number = 0) => {
                if (variation) {
                  const index =
                    variation[0] === undefined
                      ? -2
                      : variation.findIndex(
                          (el) =>
                            el.value ===
                            (prop.property_value_definition_name
                              ? prop.property_value_definition_name
                              : prop.property_value_id_long.toString())
                        );
                  if (
                    index !== -2 &&
                    index !== -1 &&
                    variation[index].name === prop.sku_property_name &&
                    variation[index].value ===
                      (prop.property_value_definition_name
                        ? prop.property_value_definition_name
                        : prop.property_value_id_long.toString())
                  ) {
                    checking[i] = true;
                  } else {
                    checking[i] = false;
                  }
                  i++;
                }
              }
            );
            if (!checking.includes(false)) theOne = varia;
          }
        );
      }
      setSelectedVariation({ ...theOne, quantity });
    }
  }, [product, variation, quantity]);

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
            {product.ds_product_details.image_u_r_ls && (
              <ProductImages
                product={product.ds_product_details}
                showImage={showImage}
                setShowImage={setShowImage}
              />
            )}

            <div
              className={`lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ${
                router.locale === "ar" && "text-right"
              }`}
            >
              {product.ds_product_details.aeop_ae_product_propertys &&
                product.ds_product_details.aeop_ae_product_propertys
                  .aeop_ae_product_property && (
                  <h1 className="font-bold">
                    {
                      product.ds_product_details.aeop_ae_product_propertys
                        .aeop_ae_product_property[0].attr_value
                    }
                  </h1>
                )}
              <p className="text-lg font-semibold">{product.product_title}</p>
              <ProductReviews product={product.ds_product_details} />
              <p className="leading-relaxed text-gray-800 dark:text-gray-100">
                {t("category")}:{" "}
                {product.second_level_category_name
                  ? product.second_level_category_name
                  : product.first_level_category_name}
              </p>
              {product.ds_product_details.properties.map((property) => (
                <ProductProperties
                  key={property.id}
                  property={property}
                  setShowImage={setShowImage}
                  setProperties={setProperties}
                />
              ))}
              <ProductQuantity
                product={product.ds_product_details}
                quantity={quantity}
                setQuantity={setQuantity}
                selectedVariation={selectedVariation}
              />
              <ProductPrice
                product={product.ds_product_details}
                selectedVariation={selectedVariation}
                converter={converter}
              />
              <ProductShipping
                product={product.ds_product_details}
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

      <ProductFeatures product={product} />
    </>
  );
};
export default ProductDetails;
