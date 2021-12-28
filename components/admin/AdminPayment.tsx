/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Avatar from "../elements/Avatar";

const AdminPayment = () => {
  const [receipts, setReceipts] = useState<any>();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
    <div>
      <h1 className="text-xl font-semibold mb-1">Payment Notifications</h1>
      <div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p>{success}</p>}
      </div>
      {receipts &&
        receipts.map((receipt: any) => (
          <div
            key={receipt.userId}
            className="border border-yellow-200 rounded-lg my-1 p-2"
          >
            <div className="flex">
              {receipt.picture && (
                <div className="pt-1">
                  <Avatar size="sm" user={receipt} />
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

            <p>
              <span className="font-bold">Order ID</span>:{" "}
              {receipt.order.orderId}
            </p>
            <div>
              <p>
                <span className="font-bold">Payment method</span>:{" "}
                {receipt.order.payment.paymentMethod}
              </p>
              <div className="h-40 w-40">
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
    </div>
  );
};

export default AdminPayment;
