/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { HeartIcon } from "@heroicons/react/outline";

import { DangerDialog } from "../elements/Dialog";
import { addToWishlist } from "../../utils/redux/userAsyncActions";
import { useSession } from "next-auth/client";
import { IUser } from "../../types";
import {
  fetchCommission,
  fetchCurrencyRate,
  IFinance,
  selectFinance,
} from "../../utils/redux/financeSlice";

const Product = ({ product }: any) => {
  const [session, loading]: [IUser | null, boolean] = useSession();
  const router = useRouter();
  const t = useTranslations("AEProduct");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { rate, commission }: IFinance = useSelector(selectFinance);

  const LocalCurrencyConverter = useCallback(
    (price: number, exchange: "DZDEUR" | "DZDUSD" | "DZDGBP") => {
      let currency: number = 0;
      if (rate && commission) {
        const rateIndex = rate.findIndex((c) => c.exchange === exchange);
        if (rateIndex !== -1) currency = rate[rateIndex].live.parallel.sale;
        return (
          Math.ceil((price * currency + price * currency * commission) / 10) *
          10
        );
      } else {
        dispatch(fetchCurrencyRate());
        dispatch(fetchCommission());
      }
    },
    [dispatch, commission, rate]
  );

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
    <div className="my-8">
      {error && <DangerDialog>{error} </DangerDialog>}
      <Link href={`/legacyaliexpress/product/${product.productId}`} passHref>
        <a className="block w-50 h-50 bg-gray-200 cursor-pointer">
          <img
            className="w-50 h-50 object-center object-cover hover:opacity-75 rounded-lg shadow-lg"
            src={product.imageUrl}
            alt={product.title}
          />
        </a>
      </Link>
      <div className="relative">
        <div>
          <h1 className="mt-2 text-sm h-5 overflow-hidden">
            <Link href={`/legacyaliexpress/product/${product.productId}`}>
              {product.title}
            </Link>
          </h1>
          <p
            className={`mt-1 text-lg font-medium ${
              router.locale === "ar" && "flex flex-row-reverse"
            }`}
          >
            <span>
              {LocalCurrencyConverter(
                product.productMinPrice.value + product.shippingMinPrice.value,
                "DZDEUR"
              )}
            </span>{" "}
            <span>{t("dzd")}</span>
          </p>
        </div>
        <div
          onClick={addToWishlistHandler}
          className={`hidden  ${
            router.locale === "ar"
              ? "hidden"
              : "lg:block right-0 top-0 pl-3 absolute   pb-5"
          } bg-pink-50 dark:bg-grim`}
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
