/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

import {
  createOrder,
  removeFromCart,
} from "../../../utils/redux/userAsyncActions";
import { selectUser } from "../../../utils/redux/userSlice";
import { ActionFeedback } from "../../aliexpress/ProductActions";
import Address from "../Address/Address";
import PhoneNumber from "../PhoneNumber";
import RealName from "../RealName";

export default function NewOrder({ products, origin }: any) {
  const t = useTranslations("NewOrder");
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, message } = useSelector(selectUser);

  useEffect(() => {
    return () => {
      localStorage.removeItem("aeno");
    };
  }, []);

  const placeOrderHandler = () => {
    products.map((item: any) => {
      dispatch(
        createOrder({
          product: {
            productId: item.productId,
            name: item.name,
            sku: item.sku,
            imageUrl: item.imageUrl,
            price: item.price,
            shippingPrice: item.shippingPrice,
            totalPrice: item.totalPrice,
            properties: item.properties,
            quantity: item.quantity,
            carrierId: item.carrierId,
            orderMemo:
              "Please do not put invoices or any other document inside the package. Instead send them to this email address support@reglini-dz.com. Thank you very much.",
          },
          shippingAddress: {
            name: user.realName,
            phoneCountry: "+213",
            mobilePhone: user.phoneNumber.replace("+213", "0"),
            addressLine1: user.address.streetName,
            city: user.address.commune,
            province: user.address.wilaya,
            countryCode: "DZ",
            zipCode: user.address.postalCode,
          },
        })
      );
    });
    if (origin === "localStorage") {
      localStorage.removeItem("aeno");
    } else if (origin === "cart") {
      products.map((item: any) => {
        dispatch(removeFromCart({ id: item.productId }));
      });
    }
    router.push("/account/orders");
  };

  return (
    <div className="border-t border-b mb-12 border-yellow-200 bg-white dark:bg-grim text-black dark:text-white shadow overflow-hidden sm:rounded-lg">
      <ActionFeedback message={message} />
      <div className="px-4 pb-5 sm:px-6">
        <h1 className="text-lg leading-6 font-medium">{t("placeNewOrder")}</h1>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 dark:bg-grim px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">{t("realName")}</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <RealName />
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 dark:bg-grim px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">{t("address")}</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <Address user={user} />
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 dark:bg-grim px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">{t("phoneNumber")}</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              <PhoneNumber />
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 dark:bg-grim px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">{t("payment")}</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              <p>{t("descPayment")}</p>
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 dark:bg-grim px-4 py-5 sm:px-6">
            <dt className="text-sm h-full font-medium ">{t("products")}</dt>
            <div>
              {products.map((item: any) => (
                <dd
                  key={item.productId}
                  className="flex border border-gray-200 flex-row my-1 text-sm  sm:col-span-2"
                >
                  {item.imageUrl && (
                    <div className="w-72 md:w-44 rounded-lg">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                  )}
                  <div className="flex flex-col px-4 py-2">
                    <p className="font-bold text-lg">{item.name}</p>
                    <p>
                      {t("productPrice")}: {item.price} {t("dzd")}
                    </p>
                    <p>
                      {t("shippingPrice")}: {item.shippingPrice} {t("dzd")}
                    </p>
                    <p>
                      {t("quantity")}: {item.quantity}
                    </p>
                    <p className="text-lg">
                      {t("totalPrice")}: {item.totalPrice} {t("dzd")}
                    </p>
                  </div>
                </dd>
              ))}
            </div>
          </div>
        </dl>
      </div>
      <div className="w-full flex justify-end my-3">
        {user.realName &&
        user.address &&
        user.phoneNumber &&
        ((user.account === "credentials" && user.verified) ||
          user.account === "oauth") ? (
          <>
            <button
              onClick={placeOrderHandler}
              className="border-2 border-blue-200 bg-blue-100 hover:bg-blue-200 dark:bg-black dark:hover:bg-gray-900   p-2 mx-5 rounded-lg"
            >
              {t("placeYourOrder")}
            </button>
          </>
        ) : (
          <>
            <p>{t("orderConditions")}:</p>
            <ul>
              {user.realName ? "" : <li>{t("conditionName")}</li>}
              {user.address ? "" : <li>{t("conditionAddress")}</li>}
              {user.phoneNumber ? "" : <li>{t("conditionPhone")}</li>}
              {user.account === "credentials" ? (
                user.verified ? (
                  ""
                ) : (
                  <li>{t("conditionEmail")}</li>
                )
              ) : (
                ""
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
