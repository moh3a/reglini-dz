/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { selectUser } from "../../../utils/redux/userSlice";
import AlertMessage from "../../elements/AlertMessage";

export default function Orders() {
  const t = useTranslations("Orders");
  const router = useRouter();
  const { user, orderStatusCode, orderMessage, message } =
    useSelector(selectUser);
  const [messages, setMessages] = useState("");
  const [errorCode, setErrorCode] = useState<number>();

  useEffect(() => {
    if (orderStatusCode) {
      setTimeout(() => {
        setMessages("");
        setErrorCode(0);
      }, 5000);
      setErrorCode(orderStatusCode);
      setMessages(orderMessage);
    } else {
      if (message !== "User found.") {
        setMessages(message);
        setTimeout(() => {
          setMessages("");
        }, 5000);
      }
    }
  }, [orderStatusCode, orderMessage, message]);

  return (
    <div className=" overflow-hidden">
      {errorCode && messages && (
        <AlertMessage type="error" message={messages} />
      )}
      <h1
        className={`${router.locale === "ar" && "text-right"} m-4 p-4 text-4xl`}
      >
        {t("yourOrders")}
      </h1>

      <div className="py-4 px-2 lg:px-4 ">
        {user && user.orders.length > 0 ? (
          user.orders.map((order: any) => (
            <div
              key={order.orderId}
              className="my-2 rounded-lg bg-gray-50 dark:bg-grim shadow-lg"
            >
              <Link href={`/account/orders/${order.orderId}`} passHref>
                <div className="flex cursor-pointer">
                  <div className="w-28 h-28 flex justify-center items-center">
                    <img
                      className="rounded-lg"
                      src={
                        order.product.imageUrl
                          ? order.product.imageUrl
                          : "/placeholder.png"
                      }
                      alt={order.orderId}
                    />
                  </div>

                  <div className="ml-1 relative w-full">
                    <div className="my-1">
                      <p>Order ID: {order.orderId}</p>
                      <p className="h-5 overflow-hidden">
                        <small className="font-bold">
                          {order.product.name}
                        </small>
                      </p>
                      <p>
                        <small className="text-red-600 font-semibold">
                          {order.product.totalPrice} DZD x{" "}
                          {order.product.quantity}
                        </small>
                      </p>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-aliexpress text-white font-bold m-1 py-1 px-3 rounded-lg">
                      View details
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center py-16 text-4xl">{t("noOrders")}</p>
        )}
      </div>
    </div>
  );
}
