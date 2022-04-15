/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/outline";

import Avatar from "../elements/Avatar";

const AdminPayment = () => {
  const [orders, setOrders] = useState<any>();

  const fetchUsers = useCallback(async () => {
    const { data } = await axios.get("/api/admin/orders");
    setOrders(data.data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="my-2 p-2">
      {orders && (
        <>
          <h1 className="text-2xl font-semibold">Users&apos; orders</h1>
          <p>Number of orders: {orders.length}</p>
          {orders.map((receipt: any) => (
            <div
              key={receipt.order.orderId}
              className="bg-gray-50 dark:bg-grim shadow-lg rounded-lg my-4 p-2"
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
                    <span className="font-bold">User email</span>:{" "}
                    {receipt.email}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-20 mr-3">
                  <img
                    className="w-20"
                    src={receipt.order.product.imageUrl}
                    alt={receipt.order.orderId}
                  />
                </div>
                <div>
                  <p>
                    <span className="font-bold">Order ID</span>:{" "}
                    {receipt.order.orderId}
                  </p>
                  <p className="font-serif font-semibold">
                    {receipt.order.product.name}
                  </p>
                </div>
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

              {receipt.order.payment.isPaymentConfirmed ? (
                <div className="my-1 pt-1 px-3 flex text-green-600">
                  <CheckCircleIcon
                    className="flex-shink-0 h-6 w-6 mr-2"
                    aria-hidden="true"
                  />
                  <p>reglini-dz: Order paid</p>
                </div>
              ) : (
                <div className="my-1 pt-1 px-3 flex text-red-600 ">
                  <XCircleIcon
                    className="flex-shink-0 h-6 w-6 mr-2"
                    aria-hidden="true"
                  />
                  <p>reglini-dz: Order unpaid</p>
                </div>
              )}
              {receipt.order.details.order_status === "FINISH" ? (
                <div className="my-1 pt-1 px-3 flex text-green-600 ">
                  <CheckCircleIcon
                    className="flex-shink-0 h-6 w-6 mr-2"
                    aria-hidden="true"
                  />
                  <p>Order finished</p>
                </div>
              ) : (
                <div className="my-1 pt-1 px-3 flex text-red-600 ">
                  <XCircleIcon
                    className="flex-shink-0 h-6 w-6 mr-2"
                    aria-hidden="true"
                  />
                  <p>Order not finished</p>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AdminPayment;
