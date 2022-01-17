/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import { selectUser } from "../../../utils/redux/userSlice";
import { IDropshipperProductDetails } from "../../../utils/AETypes";
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
  product: IDropshipperProductDetails["result"];
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

  const images = product.image_u_r_ls.split(";");
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
            {product.image_u_r_ls && (
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
              {product.aeop_ae_product_propertys &&
                product.aeop_ae_product_propertys.aeop_ae_product_property && (
                  <h1 className="font-bold">
                    {
                      product.aeop_ae_product_propertys
                        .aeop_ae_product_property[0].attr_value
                    }
                  </h1>
                )}
              <p className="text-lg font-semibold">{product.subject}</p>
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

      <div className="hidden md:flex md:flex-col md:justify-center md:items-center">
        <h2 className="font-bold text-xl">Seller&apos;s Description</h2>
        <div className="hidden md:block md:max-w-screen-md md:overflow-hidden">
          {product.detail && parse(product.detail)}
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
