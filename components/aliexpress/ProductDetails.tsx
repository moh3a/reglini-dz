import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ProductImage from "./ProductImage";
import ProductReviews from "./ProductReviews";
import ProductProperty from "./ProductProperty";
import ProductQuantity from "./ProductQuantity";
import ProductPrice from "./ProductPrice";
import {
  ActionFeedback,
  ProductToWishlist,
  ProductToCart,
  BuyProduct,
} from "./ProductActions";
import ProductFeatures from "./ProductFeatures";
import { selectUser } from "../../utils/redux/userSlice";

const ProductDetails = ({ product, session }: any) => {
  const [showImage, setShowImage] = useState("/placeholder.png");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const { message } = useSelector(selectUser);

  useEffect(() => {
    setShowImage(product.productImages[0]);
  }, [product.productImages]);

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
                    />
                  );
                })}
                <ProductQuantity
                  product={product}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>
              <ProductPrice product={product} />
              <div className="mt-4 text-center">
                {product.shipping.isAvailableForSelectedCountries ? (
                  <p className="text-green-500">
                    THIS ITEM IS AVAILABLE FOR SHIPPING IN ALGERIA
                  </p>
                ) : (
                  <p className="text-red-500">
                    THIS ITEM IS NOT AVAILABLE FOR SHIPPING IN ALGERIA
                  </p>
                )}
              </div>
              <div className="mt-4 flex">
                <BuyProduct />
                <ProductToCart
                  product={product}
                  session={session}
                  quantity={quantity}
                  setError={setError}
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
