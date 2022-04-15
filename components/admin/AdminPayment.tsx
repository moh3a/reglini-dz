/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { selectUser } from "../../utils/redux/userSlice";
import Avatar from "../elements/Avatar";
import { InformationCircleIcon } from "@heroicons/react/outline";

const AdminPayment = () => {
  const [receipts, setReceipts] = useState<any>();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState({ message: "", orderId: "" });
  const { user } = useSelector(selectUser);

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
                  <span className="font-bold">User email</span>: {receipt.email}
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
                    className="flex-shink-0 h-6 w-6 mr-2"
                    aria-hidden="true"
                  />{" "}
                  {message}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminPayment;
