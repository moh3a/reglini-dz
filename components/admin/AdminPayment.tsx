/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { selectUser } from "../../utils/redux/userSlice";
import Avatar from "../elements/Avatar";

const AdminPayment = () => {
  const [receipts, setReceipts] = useState<any>();
  const [unpaid, setUnpaid] = useState<any>();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useSelector(selectUser);

  const fetchUsers = useCallback(async () => {
    const { data } = await axios.get("/api/admin/paymentValidation");
    if (data.success) {
      setSuccess(data.message);
      setReceipts(data.data);
      setUnpaid(data.data.unpaid);
    } else {
      setError(data.message);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const declinePayment = async ({ userId, orderId }: any) => {
    const { data } = await axios.post("/api/admin/paymentValidation", {
      accepted: false,
      userId,
      orderId,
    });
    if (data) {
      setMessage(data.message);
    }
  };
  const acceptPayment = async ({ userId, orderId }: any) => {
    const { data } = await axios.post("/api/admin/paymentValidation", {
      accepted: true,
      userId,
      orderId,
    });
    if (data) {
      setMessage(data.message);
    }
  };

  return (
    <div className="my-2 p-2 border-2 border-black dark:border-yellow-200 rounded-lg">
      <div>
        <h1 className="text-xl font-semibold mb-1">Payment Notifications</h1>
        <div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p>{success}</p>}
        </div>
        {receipts && <h1 className="text-2xl font-semibold">Paid orders</h1>}
        {receipts &&
          receipts.map((receipt: any) => (
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
                    <span className="font-bold">User ID</span>: {receipt.userId}
                  </p>
                  <p>
                    <span className="font-bold">User email</span>:{" "}
                    {receipt.email}
                  </p>
                </div>
              </div>

              <div>
                <div className="border border-gray-100 shadow-md">
                  <p>
                    <span className="font-bold">Order ID</span>:{" "}
                    {receipt.order.orderId}
                  </p>
                  <p>
                    <span className="font-bold">Payment method</span>:{" "}
                    {receipt.order.payment.paymentMethod}
                  </p>
                  <p className="font-serif font-semibold">
                    {receipt.order.product.name}
                  </p>
                  <p className="text-red-500 text-lg">
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
                      declinePayment({
                        userId: receipt.userId,
                        orderId: receipt.order.orderId,
                      })
                    }
                    className="border border-red-600 bg-red-500 text-white hover:bg-red-600 rounded-lg mx-2 p-1"
                  >
                    decline
                  </button>
                  <button
                    onClick={() =>
                      acceptPayment({
                        userId: receipt.userId,
                        orderId: receipt.order.orderId,
                      })
                    }
                    className="border border-green-600 bg-green-500 text-white hover:bg-green-600 rounded-lg mx-2 p-1"
                  >
                    accept
                  </button>
                </div>
              </div>
            </div>
          ))}
        {unpaid && (
          <h1 className="text-2xl font-semibold">Users&apos; orders</h1>
        )}
        {unpaid &&
          unpaid.map((receipt: any) => (
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
                    <span className="font-bold">User ID</span>: {receipt.userId}
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
              <div className="h-40 w-40">
                <img
                  src={receipt.order.product.imageUrl}
                  alt={receipt.order.orderId}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminPayment;
