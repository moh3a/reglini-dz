import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../../../utils/redux/userSlice";
import OrderDetails from "./OrderDetails";
import AlertMessage from "../../elements/AlertMessage";

export default function Orders({ user }: any) {
  const { orderStatusCode, orderMessage, message } = useSelector(selectUser);
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
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {errorCode && messages && (
        <AlertMessage type="error" message={messages} />
      )}
      {messages && !errorCode && (
        <AlertMessage type="success" message={messages} />
      )}

      <h1 className="px-4 py-5 sm:px-6 text-2xl leading-6 font-medium text-gray-900">
        Your orders
      </h1>

      <div className="m-2 py-4 px-2">
        {user && user.orders.length > 0 ? (
          user.orders.map((order: any) => (
            <OrderDetails order={order} key={order.orderId} />
          ))
        ) : (
          <p>No orders made.</p>
        )}
      </div>
    </div>
  );
}
