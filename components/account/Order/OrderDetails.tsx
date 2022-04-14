/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { PhotographIcon, ChevronLeftIcon } from "@heroicons/react/outline";

import PayNow from "./PayNow";
import Tracking from "./Tracking";
import DeleteOrder from "./DeleteOrder";
import ConfirmOrderReceived from "./ConfirmOrderReceived";
import { selectUser } from "../../../utils/redux/userSlice";
import {
  getOrderDetails,
  cancelOrder,
} from "../../../utils/redux/userAsyncActions";
import { IAEOrderDetails } from "../../../types/AETypes";

export default function OrderDetails({ id }: { id: string }) {
  const t = useTranslations("Orders");
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [order, setOrder] = useState<IAEOrderDetails>();

  useEffect(() => {
    dispatch(getOrderDetails({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (user && user.orders) {
      const index = user.orders.findIndex(
        (order: any) => order.orderId.toString() === id
      );
      if (index !== -1) {
        setOrder(user.orders[index]);
      }
    }
  }, [id, user]);

  return (
    <div className="py-10 dark:bg-grim overflow-hidden">
      {order && (
        <div className="flex shadow ">
          <div className="relative w-full">
            <div className="ml-2 mt-1">
              <span className="sr-only">go back</span>
              <button
                onClick={() => router.back()}
                className="px-4 py-1 my-1 lg:mx-1 rounded-lg bg-orange-500 hover:bg-orange-400"
              >
                <ChevronLeftIcon
                  className="flex-shink-0 h-6 w-6 text-gray-100"
                  aria-hidden="true"
                />
              </button>
            </div>
            <DeleteOrder id={order.orderId} />

            <div className="flex flex-col items-center lg:items-start lg:flex-row lg:mx-3">
              {order.product.imageUrl ? (
                <div className="w-72 md:w-44 lg:mt-18">
                  <img
                    src={order.product.imageUrl}
                    alt={order.product.name}
                    className="rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full h-12" />
              )}
              <div className="px-4 py-5 sm:px-6 text-center lg:text-left">
                <h1 className="text-lg leading-6 font-medium">
                  <Link href={`/account/orders/${order.orderId}`} passHref>
                    <div>
                      {t("orderId")}: {order.orderId}
                    </div>
                  </Link>
                </h1>
                {!order.payment.hasTimedOut && (
                  <>
                    {order.createdAt && (
                      <p>
                        {t("orderTime")}: {order.createdAt.substring(0, 10)}{" "}
                        {order.createdAt.substring(11, 16)} GMT
                      </p>
                    )}
                    {order.details.order_status && (
                      <p>
                        {t("orderStatus")}:{" "}
                        <span className="text-lg font-semibold text-gray-500">
                          {order.details.order_status}
                        </span>
                      </p>
                    )}
                    <small>
                      {t("productId")}: {order.product.productId}
                    </small>
                    <p className="text-2xl">{order.product.name} </p>
                    <p className="font-bold text-xl text-red-500">
                      {order.product.totalPrice} DZD
                    </p>
                    {order.details.order_status !== "FINISH" ? (
                      <>
                        <div className="bg-gray-50 dark:bg-grim font-bold rounded-lg shadow-lg my-2 py-1 px-3">
                          <p>
                            {t("shippedTo")} {order.shippingAddress.name}
                          </p>
                          <p>
                            {t("addressShippedTo")}:{" "}
                            {order.shippingAddress.addressLine1}
                            {" - "}
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.province}{" "}
                            {order.shippingAddress.zipCode}
                          </p>
                        </div>
                        {order.payment.wasDeclined && (
                          <div className="my-1  py-1 px-3 text-red-800 font-bold border-2 border-red-300 bg-red-100 rounded-lg">
                            {t("paymentDeclined")}
                          </div>
                        )}
                        {order.payment.receipt &&
                          !order.packageReceived.wasReceived && (
                            <div className="py-1 px-3 border-2 border-green-300 bg-green-100 rounded-lg">
                              <p className="text-green-800 font-bold">
                                {order.payment.isPaymentConfirmed
                                  ? t("paymentAccepted")
                                  : t("processingPayment")}
                              </p>
                              {order.payment.paymentTime && (
                                <p className="text-green-600">
                                  {t("paymentTime")}:{" "}
                                  {order.payment.paymentTime.substring(0, 10)}{" "}
                                  {order.payment.paymentTime.substring(11, 16)}{" "}
                                </p>
                              )}
                              <a
                                className="text-green-600 flex justify-center"
                                target="_blank"
                                rel="noreferrer"
                                href={order.payment.receipt}
                              >
                                {t("checkPayment")}{" "}
                                <PhotographIcon
                                  className="flex-shink-0 h-6 w-6"
                                  aria-hidden="true"
                                />
                              </a>
                            </div>
                          )}
                      </>
                    ) : (
                      <div className="bg-aliexpress text-white text-center font-bold rounded-lg shadow-lg my-2 py-1 px-3">
                        Order finished.
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            {order.packageReceived.wasReceived && (
              <div className="text-center text-green-500 font-bold">
                <p>Order closed.</p>
                <p>Thank you for using reglini-dz !</p>
              </div>
            )}
            {order.payment.hasTimedOut ? (
              <div className="flex flex-col items-center lg:flex-row lg:justify-end mx-3 my-1 py-1 px-3 text-red-800 font-bold border-2 border-red-300 bg-red-100 rounded-lg">
                {t("hasTimedOut")}
              </div>
            ) : (
              order.details.order_status !== "FINISH" && (
                <div className="flex flex-col items-center lg:flex-row lg:justify-end py-2 px-3 text-black">
                  {!order.payment.isPaymentConfirmed &&
                    !order.packageReceived.wasReceived && (
                      <div>
                        <button
                          className="bg-red-200 px-4 py-1 my-1 lg:mx-1 rounded-lg hover:bg-red-300 dark:bg-red-400"
                          onClick={() => {
                            dispatch(cancelOrder({ id: order.orderId }));
                            router.replace("/account/orders");
                          }}
                        >
                          {t("cancelOrder")}
                        </button>
                      </div>
                    )}
                  <PayNow order={order} />
                  <Tracking order={order} />
                  <ConfirmOrderReceived order={order} />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
