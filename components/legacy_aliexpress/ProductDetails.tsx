import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import ProductImage from "./ProductImage";
import ProductReviews from "./ProductReviews";
import ProductProperty from "./ProductProperty";
import ProductQuantity from "./ProductQuantity";
import ProductPrice from "./ProductPrice";
import ProductShipping from "./ProductShipping";
import {
  ActionFeedback,
  ProductToWishlist,
  ProductToCart,
  BuyProduct,
} from "./ProductActions";
import ProductFeatures from "./ProductFeatures";
import { selectUser } from "../../utils/redux/userSlice";

const ProductDetails = ({ product, session, converter }: any) => {
  const router = useRouter();
  const t = useTranslations("AEProduct");
  const [properties, setProperties] = useState([{ name: "", value: "" }]);
  const [variation, setVariation] = useState([{ name: "", value: "" }]);
  const [showImage, setShowImage] = useState("/placeholder.png");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [selectedShipping, setSelectedShipping] = useState(
    product.shipping.carriers[0]
  );
  const { message } = useSelector(selectUser);

  const [selectedVariation, setSelectedVariation] = useState<{
    imageUrl: string;
    price: {};
    properties: any[];
    sku: string;
    thumbnailImageUrl: string;
    quantity?: number;
    stock?: number;
  }>();

  useEffect(() => {
    setShowImage(product.productImages[0]);
  }, [product.productImages]);

  useEffect(() => {
    if (product.hasProperties && properties) {
      let inverse = properties.slice().reverse();
      let values = product.properties.map((prop: any) =>
        inverse.find((property: any) => property.name === prop.name)
      );
      setVariation(values);
    } else if (!product.hasProperties) {
    }
  }, [product, properties]);

  useEffect(() => {
    if (product.hasVariations && variation) {
      let theOne = {
        imageUrl: "",
        price: {},
        properties: [{}],
        sku: "",
        thumbnailImageUrl: "",
      };
      if (product.variations.length > 1) {
        product.variations.map((varia: any) => {
          let checking: boolean[] = [];
          varia.properties.map(() => checking.push(false));
          varia.properties.map((prop: any, i: number = 0) => {
            const index =
              variation[0] === undefined
                ? -2
                : variation.findIndex((el) => el.value === prop.value.name);
            if (
              index !== -2 &&
              index !== -1 &&
              variation[index].name === prop.name &&
              variation[index].value === prop.value.name
            ) {
              checking[i] = true;
            } else {
              checking[i] = false;
            }
            i++;
          });
          if (!checking.includes(false)) theOne = varia;
        });
      } else {
        theOne = product.variations[0];
      }
      setSelectedVariation({ ...theOne, quantity });
      console.log({ ...theOne, quantity });
    }
  }, [product, variation, quantity]);

  // useEffect(() => {
  //   if (product.hasVariations && variation) {
  //     let theOne = {
  //       imageUrl: "",
  //       price: {},
  //       properties: [{}],
  //       sku: "",
  //       thumbnailImageUrl: "",
  //     };
  //     if (product && product.variations.length === 1) {
  //       theOne = {
  //         imageUrl: product.variations[0].imageUrl,
  //         price: product.variations[0].price,
  //         properties: product.variations[0].properties,
  //         sku: product.variations[0].sku,
  //         thumbnailImageUrl: product.variations[0].thumbnailImageUrl,
  //       };
  //     }
  //     setSelectedVariation({ ...theOne, quantity });
  //   }
  // }, [product, quantity, variation]);

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
            <ProductImage
              product={product}
              showImage={showImage}
              setShowImage={setShowImage}
            />
            <div
              className={`lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ${
                router.locale === "ar" && "text-right"
              }`}
            >
              <h1
                className={`text-sm  title-font text-gray-700 dark:text-gray-200 tracking-widest`}
              >
                {product.attributes[0].value.name}
              </h1>
              <h2 className="text-gray-800 dark:text-gray-100 text-3xl title-font font-medium mb-1">
                {product.title}
              </h2>
              <ProductReviews product={product} />
              <p className="leading-relaxed text-gray-800 dark:text-gray-100">
                {t("category")}: {product.productCategory.name}
              </p>
              <div className="mt-6 text-gray-800 dark:text-gray-100 pb-5 mb-5">
                {product.properties.map((property: any) => {
                  return (
                    <ProductProperty
                      setShowImage={setShowImage}
                      property={property}
                      key={property.name}
                      setProperties={setProperties}
                    />
                  );
                })}
                <ProductQuantity
                  product={product}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  selectedVariation={selectedVariation}
                />
              </div>
              <ProductPrice
                converter={converter}
                product={product}
                selectedVariation={selectedVariation}
              />
              <ProductShipping
                converter={converter}
                product={product}
                setSelectedShipping={setSelectedShipping}
              />
              <div className="mt-4 flex">
                {
                  <BuyProduct
                    converter={converter}
                    product={product}
                    session={session}
                    setError={setError}
                    selectedVariation={selectedVariation}
                    selectedShipping={selectedShipping}
                  />
                }
                {
                  <ProductToCart
                    converter={converter}
                    product={product}
                    session={session}
                    setError={setError}
                    selectedVariation={selectedVariation}
                    selectedShipping={selectedShipping}
                  />
                }
                <ProductToWishlist
                  converter={converter}
                  product={product}
                  session={session}
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
