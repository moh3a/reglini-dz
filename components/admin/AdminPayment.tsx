/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  CursorClickIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

import Avatar from "../elements/Avatar";

const AdminPayment = () => {
  const [receipts, setReceipts] = useState<any>();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState({ message: "", orderId: "" });

  const fetchUsers = useCallback(async () => {
    const { data } = await axios.get("/api/admin/paymentValidation");
    if (data.success) {
      setSuccess(data.message);
      setReceipts(data.data);
    } else {
      setError(data.message);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const respondToPayment = async ({
    userId,
    orderId,
    accepted,
  }: {
    userId: string;
    orderId: string;
    accepted: boolean;
  }) => {
    const { data } = await axios.post("/api/admin/paymentValidation", {
      accepted,
      userId,
      orderId,
    });
    if (data) {
      setMessage({ message: data.message, orderId });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-1">Payment Notifications</h1>
      <div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p>{success}</p>}
      </div>
      {receipts &&
        receipts.map((receipt: any) => (
          <div
            key={receipt.order.orderId}
            className="bg-gray-50 dark:bg-grim rounded-lg shadow-lg my-4 p-2"
          >
            <div className="flex">
              {receipt.picture && (
                <div className="pt-1">
                  <Avatar size="sm" picture={receipt.picture} />
                </div>
              )}
              <div className="pl-3">
                <p>
                  <span className="font-bold">User ID</span>: {receipt.userId}
                </p>
                <p>
                  <span className="font-bold">User email</span>: {receipt.email}
                </p>
              </div>
            </div>

            <div>
              <div className="">
                <a
                  href={`https://www.aliexpress.com/p/order/detail.html?orderId=${receipt.order.orderId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <span className="font-bold text-gray-600 dark:text-gray-400">
                    Order ID{" "}
                    <CursorClickIcon
                      className="flex-shink-0 h-6 w-6 inline"
                      aria-hidden="true"
                    />
                  </span>
                  : {receipt.order.orderId}
                </a>
                <p>
                  <span className="font-bold text-gray-600 dark:text-gray-400">
                    Order created at
                  </span>
                  : {receipt.order.createdAt.substring(0, 10)}{" "}
                  {receipt.order.createdAt.substring(11, 16)}
                </p>
                <a
                  href={`https://www.reglini-dz.com/aliexpress/product/${receipt.order.product.productId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <span className="font-bold text-gray-600 dark:text-gray-400">
                    Product ID{" "}
                    <CursorClickIcon
                      className="flex-shink-0 h-6 w-6 inline"
                      aria-hidden="true"
                    />
                  </span>
                  : {receipt.order.product.productId}
                </a>
                <p className="font-serif font-semibold">
                  {receipt.order.product.name}
                </p>
                <p>
                  <span className="text-gray-600 dark:text-gray-400">
                    Payment method
                  </span>
                  : {receipt.order.payment.paymentMethod}
                </p>
              </div>
              <div>
                <p>
                  <span className="text-gray-600 dark:text-gray-400">
                    Product price:
                  </span>{" "}
                  {receipt.order.product.price} DZD
                </p>
                <p>
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping price:
                  </span>{" "}
                  {receipt.order.product.shippingPrice} DZD
                </p>
                <p>
                  <span className="text-gray-600 dark:text-gray-400">
                    Total price:
                  </span>{" "}
                  {receipt.order.product.totalPrice} DZD
                </p>
              </div>
              <div className="my-4 h-40 w-40">
                <a
                  href={receipt.order.payment.receipt}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={receipt.order.payment.receipt}
                    alt={receipt.order.orderId}
                  />
                </a>
              </div>
              <p>Is this payment legit?</p>
              <div>
                <button
                  onClick={() =>
                    respondToPayment({
                      userId: receipt.userId,
                      orderId: receipt.order.orderId,
                      accepted: false,
                    })
                  }
                  className="border border-red-600 bg-red-500 text-white hover:bg-red-600 rounded-lg mx-2 p-1"
                >
                  decline
                </button>
                <button
                  onClick={() =>
                    respondToPayment({
                      userId: receipt.userId,
                      orderId: receipt.order.orderId,
                      accepted: true,
                    })
                  }
                  className="border border-green-600 bg-green-500 text-white hover:bg-green-600 rounded-lg mx-2 p-1"
                >
                  accept
                </button>
              </div>
              {message && message.orderId === receipt.order.orderId && (
                <p className="text-indigo-500">
                  <InformationCircleIcon
                    className="flex-shink-0 h-6 w-6 inline mr-2"
                    aria-hidden="true"
                  />{" "}
                  {message.message}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminPayment;
