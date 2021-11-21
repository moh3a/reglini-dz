import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { selectUser } from "../../utils/redux/userSlice";
import {
  getOrderDetails,
  cancelOrder,
} from "../../utils/redux/userAsyncActions";

export default function OrderDetails({ order }: any) {
  const [openTracking, setOpenTracking] = useState(false);

  const dispatch = useDispatch();
  const { message } = useSelector(selectUser);

  useEffect(() => {
    if (message !== "Successfully retrieved your order details.") {
      dispatch(getOrderDetails({ id: order.orderId }));
    }
  }, [message, dispatch, order.orderId]);

  return (
    <div className="bg-white shadow border-2 border-blue-500 overflow-hidden sm:rounded-lg">
      <div className="flex shadow ">
        {order.product.imageUrl && (
          <div className="w-72 md:w-44 rounded-lg">
            <Image
              className=""
              src={order.product.imageUrl}
              alt={order.product.name}
              height={300}
              width={300}
            />
          </div>
        )}
        <div className="w-full">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Order ID: {order.orderId}
            </h3>
            {order.creationTime ? (
              <p>
                Order time: {order.creationTime.substring(0, 10)}{" "}
                {order.creationTime.substring(11, 16)}{" "}
              </p>
            ) : (
              ""
            )}
            {order.status ? <p>Order status: {order.status}</p> : ""}
            <small>ProductID: {order.product.productId}</small>
          </div>
          <div className="flex justify-end py-2 px-3">
            {order.canCancel && (
              <button
                onClick={() => dispatch(cancelOrder({ id: order.orderId }))}
              >
                Cancel order
              </button>
            )}
            <button
              onClick={() =>
                openTracking ? setOpenTracking(false) : setOpenTracking(true)
              }
              className="px-3 py-1 border border-gray-200"
            >
              {openTracking ? "Close Tracking" : "Open Tracking"}
            </button>
          </div>
        </div>
      </div>
      {openTracking && (
        <div>
          {order.tracking.isTrackingAvailable
            ? "Tracking Available"
            : "Tracking Not Available"}
        </div>
      )}
    </div>
  );
}
