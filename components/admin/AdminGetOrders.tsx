/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { selectUser } from "../../utils/redux/userSlice";
import Avatar from "../elements/Avatar";

const AdminPayment = () => {
  const [unpaid, setUnpaid] = useState<any>();
  const [display, setDisplay] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { user } = useSelector(selectUser);

  const fetchUsers = useCallback(async () => {
    const { data } = await axios.get("/api/admin/orders");
    if (data.success) {
      setSuccess(data.message);
      setUnpaid(data.data);
    } else {
      setError(data.message);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="my-2 p-2">
      <h1 className="text-xl font-semibold mb-1">Statistics</h1>
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-around">
        <div
          onClick={() => {
            display === "orders" ? setDisplay("") : setDisplay("orders");
          }}
          className="my-1 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 text-center w-44 h-44 rounded-lg shadow-md flex flex-col justify-center items-center"
        >
          <div className="text-xl font-bold ">Users&apos; orders</div>
          {unpaid && <div>{unpaid.length} orders</div>}
        </div>
        <div
          onClick={() => {
            display === "payments" ? setDisplay("") : setDisplay("payments");
          }}
          className="my-1 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 text-center w-44 h-44 rounded-lg shadow-md flex flex-col justify-center items-center"
        >
          <div className="text-xl font-bold ">Accepted payments</div>
          <div>{user.admin.acceptedPayments.length} payments</div>
        </div>
        <div className="my-1 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 text-center w-44 h-44 rounded-lg shadow-md flex flex-col justify-center items-center">
          <div className="text-xl font-bold ">Revenue DZD</div>
          <div>{user.admin.ordersMoneySumDinars} DZD</div>
        </div>
        <div className="my-1 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 text-center w-44 h-44 rounded-lg shadow-md flex flex-col justify-center items-center">
          <div className="text-xl font-bold ">Revenue Euro</div>
          <div>{user.admin.ordersMoneySumEuros} euros</div>
        </div>
      </div>
      <div>
        {/* <div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p>{success}</p>}
        </div> */}
        {display === "orders" && unpaid && (
          <>
            <h1 className="text-2xl font-semibold">Users&apos; orders</h1>
            {unpaid.map((receipt: any) => (
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
        {display === "payments" &&
          user.admin.acceptedPayments &&
          user.admin.acceptedPayments.length > 0 && (
            <div>
              <h1 className="text-2xl font-semibold">Accepted Payments</h1>
              {user.admin.acceptedPayments.map((payment: any) => (
                <div
                  key={payment.orderId}
                  className="border border-yellow-500 p-1 rounded-lg my-2 flex justify-around"
                >
                  <p>User ID: {payment.userId}</p>
                  <p>Order ID: {payment.orderId}</p>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default AdminPayment;
