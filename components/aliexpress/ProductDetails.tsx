import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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

const ProductDetails = ({ product, session }: any) => {
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
      setSelectedVariation({ ...theOne, quantity });
    }
  }, [product, variation, quantity]);

  return (
    <>
      <section className="bg-red-50 dark:bg-red-900 text-gray-600 body-font overflow-hidden">
        <ActionFeedback message={message} error={error} />
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <ProductImage
              product={product}
              showImage={showImage}
              setShowImage={setShowImage}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-700 dark:text-gray-200 tracking-widest">
                {product.attributes[0].value.name}
              </h2>
              <h1 className="text-gray-800 dark:text-gray-100 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <ProductReviews product={product} />
              <p className="leading-relaxed text-gray-800 dark:text-gray-100">
                Category: {product.productCategory.name}
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
                product={product}
                selectedVariation={selectedVariation}
              />
              <ProductShipping
                product={product}
                setSelectedShipping={setSelectedShipping}
              />
              <div className="mt-4 flex">
                <BuyProduct
                  product={product}
                  session={session}
                  setError={setError}
                  selectedVariation={selectedVariation}
                  selectedShipping={selectedShipping}
                />
                <ProductToCart
                  product={product}
                  session={session}
                  setError={setError}
                  selectedVariation={selectedVariation}
                  selectedShipping={selectedShipping}
                />
                <ProductToWishlist
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
