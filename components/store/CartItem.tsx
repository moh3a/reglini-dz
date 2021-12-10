import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import {
  removeFromCart,
  updateQuantity,
} from "../../utils/redux/userAsyncActions";

const CartItem = ({ item }: any) => {
  const t = useTranslations("Cart");
  const router = useRouter();
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const quantityHandler = (e: any) => {
    setQuantity(parseInt(e.target.value));
    dispatch(
      updateQuantity({ id: item.productId, quantity: parseInt(e.target.value) })
    );
  };

  return (
    <li className={`py-6 flex ${router.locale === "ar" && "flex-row-reverse"}`}>
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <Image
          src={item.imageUrl ? item.imageUrl : "/placeholder.png"}
          alt={item.name ? item.name : ""}
          height={100}
          width={100}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div
        className={`${
          router.locale === "ar" ? "mr-3" : "ml-3"
        }  flex-1 flex flex-col`}
      >
        <div>
          <div
            className={`flex flex-col ${
              router.locale === "ar" && "text-right"
            } justify-between text-base font-medium text-gray-800 dark:text-gray-100`}
          >
            <h3>
              <Link href={`/aliexpress/product/${item.productId}`}>
                <a target="_blank">{item.name}</a>
              </Link>
            </h3>
            <p
              className={`ml-4 text-red-600 ${
                router.locale === "ar" && "flex flex-row-reverse"
              }`}
            >
              <span>{item.price}</span> <span>{t("DZD")}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-between text-xs  my-2">
          {item.properties.map((property: any) => (
            <div
              key={property.id}
              className={`hover:underline ${
                router.locale === "ar" && "flex flex-row-reverse"
              }`}
            >
              <span>{property.name}</span>
              <span>:</span>
              <span className="font-bold text-gray-500">
                {" "}
                {property.value.name}
              </span>
            </div>
          ))}
        </div>
        <div className={`text-xs text-gray-700 dark:text-gray-200 my-2`}>
          <p
            className={`${
              router.locale === "ar" &&
              "flex flex-row-reverse text-right w-full"
            }`}
          >
            <span>{t("shippingCarrier")}</span>
            <span>:</span>{" "}
            <span className="px-2 font-bold">{item.carrierId}</span>
          </p>
          <p
            className={`${
              router.locale === "ar" &&
              "flex flex-row-reverse text-right w-full"
            }`}
          >
            <span>{t("shippingPrice")}</span>
            <span>:</span>
            <span
              className={`px-2 ${
                router.locale === "ar" && "flex flex-row-reverse"
              }`}
            >
              <span>{item.shippingPrice}</span>
              <span>{t("DZD")}</span>
            </span>
          </p>
        </div>
        <div
          className={`flex-1 flex items-end justify-between text-sm ${
            router.locale === "ar" && "flex flex-row-reverse"
          }`}
        >
          <p
            className={`text-gray-600 dark:text-gray-200 ${
              router.locale === "ar" && "flex flex-row-reverse"
            }`}
          >
            <span> {t("qty")}</span>{" "}
            <input
              type="number"
              min="1"
              onKeyDown={(e) => e.preventDefault()}
              step="1"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={quantityHandler}
              className="p-1 mr-4 text-center w-20 rounded-full focus:ring-2 text-black focus:ring-red-500 focus:border-red-500"
            />
          </p>

          <div className="flex">
            <button
              onClick={() =>
                dispatch(
                  removeFromCart({
                    id: item.productId,
                  })
                )
              }
              type="button"
              className="font-medium text-red-600 hover:text-red-500"
            >
              {t("remove")}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CartItem;
