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
      <h1 className="text-xl font-semibold mb-1">Orders stats</h1>
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-start">
        {orders && (
          <div className="m-1 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800  text-center w-44 h-44 rounded-lg shadow-md flex flex-col justify-center items-center">
            <div className="text-xl font-bold ">Users&apos; orders</div>
            <div>{orders.length} orders</div>
          </div>
        )}
      </div>

      <div>
        {orders && (
          <>
            <h1 className="text-2xl font-semibold">Users&apos; orders</h1>
            {orders.map((receipt: any) => (
              <div
                key={receipt.order.orderId}
                className="border border-yellow-200 rounded-lg my-1 p-2"
              >
                <div className="flex">
                  {receipt.picture && (
                    <div className="pt-1">
                      <Avatar size="sm" picture={receipt.picture} />
                    </div>
                  )}
                  <div className="pl-3">
                    <p>
                      <span className="font-bold">User ID</span>:{" "}
                      {receipt.userId}
                    </p>
                    <p>
                      <span className="font-bold">User email</span>:{" "}
                      {receipt.email}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-100 shadow-md">
                  <p>
                    <span className="font-bold">Order ID</span>:{" "}
                    {receipt.order.orderId}
                  </p>
                  <p className="font-serif font-semibold">
                    {receipt.order.product.name}
                  </p>
                  <p className="text-red-500 text-lg">
                    {receipt.order.product.totalPrice} DZD
                  </p>
                </div>
                {receipt.order.payment.isPaymentConfirmed ? (
                  <div className="my-1 flex border border-green-500 bg-green-300 py-1 px-3 text-green-900">
                    <CheckCircleIcon
                      className="flex-shink-0 h-6 w-6 mr-2"
                      aria-hidden="true"
                    />
                    <p>ORDER PAID</p>
                  </div>
                ) : (
                  <div className="my-1 flex border border-red-500 bg-red-300 py-1 px-3 text-red-900">
                    <XCircleIcon
                      className="flex-shink-0 h-6 w-6 mr-2"
                      aria-hidden="true"
                    />
                    <p>ORDER UNPAID</p>
                  </div>
                )}
                <div></div>
                <div className="h-40 w-40">
                  <img
                    src={receipt.order.product.imageUrl}
                    alt={receipt.order.orderId}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPayment;
