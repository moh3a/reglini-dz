import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import { selectUser } from "../../../utils/redux/userSlice";
import OrderDetails from "./OrderDetails";
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
      setErrorCode(orderStatusCode);
      setMessages(orderMessage);
      // setTimeout(() => {
      //   setMessages("");
      // }, 5000);
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
    <div className="bg-white dark:bg-grim shadow overflow-hidden sm:rounded-lg">
      {errorCode && messages && (
        <AlertMessage type="error" message={messages} />
      )}
      {messages && !errorCode && (
        <AlertMessage type="success" message={messages} />
      )}
      <h1
        className={`${router.locale === "ar" && "text-right"} m-4 p-4 text-4xl`}
      >
        {t("yourOrders")}
      </h1>

      <div className="py-4 px-2 lg:px-4 border-t border-b border-black dark:border-yellow-200 bg-yellow-100 dark:bg-black">
        {user && user.orders.length > 0 ? (
          user.orders.map((order: any) => (
            <OrderDetails order={order} key={order.orderId} />
          ))
        ) : (
          <p className="text-center py-16 text-4xl">{t("noOrders")}</p>
        )}
      </div>
    </div>
  );
}
