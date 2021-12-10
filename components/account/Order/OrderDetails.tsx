import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useTranslations } from "next-intl";

import SubmitPayment from "./SubmitPayment";
import {
  getOrderDetails,
  cancelOrder,
} from "../../../utils/redux/userAsyncActions";

export default function OrderDetails({ order }: any) {
  const [openTracking, setOpenTracking] = useState(false);
  const [openPayNow, setOpenPayNow] = useState(false);

  return (
    <div className="my-5 shadow-md border-2 text-black dark:text-yellow-100 border-yellow-200 bg-white dark:bg-grim overflow-hidden rounded-lg">
      <div className="flex shadow ">
        {openPayNow ? (
          <PayNow order={order} setOpenPayNow={setOpenPayNow} />
        ) : openTracking ? (
          <Tracking order={order} setOpenTracking={setOpenTracking} />
        ) : (
          <Details
            order={order}
            setOpenTracking={setOpenTracking}
            setOpenPayNow={setOpenPayNow}
          />
        )}
      </div>
    </div>
  );
}

const Tracking = ({ order, setOpenTracking }: any) => {
  const t = useTranslations("Orders");

  return (
    <div className="w-full">
      <div>
        <button
          className="text-red-500 mb-2"
          onClick={() => setOpenTracking(false)}
        >
          &lt; {t("goBack")}
        </button>
      </div>
      <div className="px-4 py-5 sm:px-6">
        {order.tracking.isTrackingAvailable
          ? t("trackingAvailable")
          : t("trackingNotAvailable")}
      </div>
    </div>
  );
};

const PayNow = ({ order, setOpenPayNow }: any) => {
  const t = useTranslations("Orders");

  return (
    <div className="w-full">
      <div>
        <button
          className="text-red-500 mb-2"
          onClick={() => setOpenPayNow(false)}
        >
          &lt; {t("goBack")}
        </button>
      </div>
      <SubmitPayment order={order} setOpenPayNow={setOpenPayNow} />
    </div>
  );
};

const Details = ({ order, setOpenPayNow, setOpenTracking }: any) => {
  const t = useTranslations("Orders");
  const dispatch = useDispatch();

  return (
    <div className="w-full">
      <div className="flex items-center flex-col lg:items-start lg:flex-row">
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
        <div className="px-4 py-5 sm:px-6 text-center lg:text-left">
          <h3 className="text-lg leading-6 font-medium">
            {t("orderId")}: {order.orderId}
          </h3>
          {order.creationTime ? (
            <p>
              {t("orderTime")}: {order.creationTime.substring(0, 10)}{" "}
              {order.creationTime.substring(11, 16)}{" "}
            </p>
          ) : (
            ""
          )}
          {order.status ? (
            <p>
              {t("orderStatus")}: {order.status}
            </p>
          ) : (
            ""
          )}
          <small>
            {t("productId")}: {order.product.productId}
          </small>
          <p>{order.product.title} </p>
          {order.payment.receipt && (
            <div className="py-1 px-3 border-2 border-green-300 bg-green-100 rounded-lg">
              <p className="text-green-800 font-bold">
                {t("processingPayment")}
              </p>
              {order.payment.paymentTime && (
                <p>
                  {t("paymentTime")}:{" "}
                  {order.payment.paymentTime.substring(0, 10)}{" "}
                  {order.payment.paymentTime.substring(11, 16)}{" "}
                </p>
              )}
              <a target="_blank" rel="noreferrer" href={order.payment.receipt}>
                {t("checkPayment")}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center lg:flex-row lg:justify-end py-2 px-3 text-black">
        {order.canCancel && (
          <div>
            <button
              className="bg-red-200 px-4 py-1 my-1 lg:mx-1 rounded-lg hover:bg-red-300 dark:bg-red-400"
              onClick={() => dispatch(cancelOrder({ id: order.orderId }))}
            >
              {t("cancelOrder")}
            </button>
          </div>
        )}
        {order.status &&
          order.status !== "COMPLETED" &&
          !order.isPaid &&
          !order.payment.receipt && (
            <div>
              <button
                className="bg-indigo-200 px-4 py-1 my-1 lg:mx-1 rounded-lg hover:bg-indigo-300 dark:bg-indigo-400"
                onClick={() => setOpenPayNow(true)}
              >
                {t("payNow")}
              </button>
            </div>
          )}
        <div>
          <button
            onClick={() => setOpenTracking(true)}
            className="bg-indigo-200 px-4 py-1 my-1 lg:mx-1 rounded-lg hover:bg-indigo-300 dark:bg-indigo-400"
          >
            {t("tracking")}
          </button>
        </div>
        <div>
          <button
            className="bg-green-200 px-4 py-1 my-1 lg:mx-1 rounded-lg hover:bg-green-300 dark:bg-green-400"
            onClick={() => dispatch(getOrderDetails({ id: order.orderId }))}
          >
            {t("refresh")}
          </button>
        </div>
      </div>
    </div>
  );
};
