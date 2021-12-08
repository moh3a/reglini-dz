import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/outline";

import { DangerDialog } from "../elements/Dialog";
import { addToWishlist } from "../../utils/redux/userAsyncActions";

const Product = ({ product, session, converter }: any) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const addToWishlistHandler = (e: any) => {
    e.preventDefault();
    if (!session) {
      setTimeout(() => {
        setError("");
      }, 3000);
      setError("You should be logged in to add to wishlist.");
    } else if (session) {
      dispatch(
        addToWishlist({
          productId: product.productId,
          name: product.title,
          price: product.productMinPrice.value,
          imageUrl: product.imageUrl,
        })
      );
    }
  };

  return (
    <div>
      {error && <DangerDialog>{error} </DangerDialog>}
      <Link href={`/aliexpress/product/${product.productId}`} passHref>
        <a className="w-50 bg-gray-200 cursor-pointer">
          <Image
            src={product.imageUrl}
            alt={product.title}
            layout="responsive"
            height={50}
            width={50}
            className="w-full h-full object-center object-cover hover:opacity-75 rounded-lg shadow-lg"
          />
        </a>
      </Link>
      <div className="relative">
        <div>
          <h3 className="mt-4 text-sm">
            <Link href={`/aliexpress/product/${product.productId}`}>
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-lg font-medium">
            {converter(
              product.productMinPrice.value + product.shippingMinPrice.value
            )}{" "}
            DZD
          </p>
        </div>
        <div
          onClick={addToWishlistHandler}
          className="hidden lg:block absolute right-0 top-0 pl-4 pb-5 bg-pink-50 dark:bg-grim"
        >
          <HeartIcon
            className="w-5 hover:text-red-500 cursor-pointer"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
