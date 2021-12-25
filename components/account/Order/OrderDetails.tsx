import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TrashIcon, PhotographIcon } from "@heroicons/react/outline";

import SubmitPayment from "./SubmitPayment";
import {
  deleteOrder,
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
        {order.tracking.isTrackingAvailable ? (
          <p className="text-green-500">{t("trackingAvailable")}</p>
        ) : (
          <p className="text-red-500">{t("trackingNotAvailable")}</p>
        )}
      </div>
      {order.tracking.isTrackingAvailable && (
        <div>
          <p className="text-xl font-bold">
            {order.tracking.packages[0].caption}
          </p>
          <p>
            The product will be shipped from{" "}
            {order.tracking.packages[0].shipFrom} to{" "}
            {order.tracking.packages[0].shipTo} by{" "}
            {order.tracking.packages[0].carrier.name}.
          </p>
          <p>
            Estimated progress percentage{" "}
            {order.tracking.packages[0].progressPercentage}%.
          </p>
          <p className="underline">
            <a
              href={order.tracking.packages[0].trackingUrl}
              target="_blank"
              rel="noreferrer"
            >
              Follow this link to the carrier&apos;s tracking page
            </a>
          </p>
        </div>
      )}
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

import { Dialog, Transition } from "@headlessui/react";
const Details = ({ order, setOpenPayNow, setOpenTracking }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Orders");
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="relative w-full">
      <div className="z-10 absolute right-0 top-0 mr-2 mt-1">
        <span className="sr-only">delete</span>
        <button
          onClick={() => openModal()}
          className="px-4 py-1 my-1 lg:mx-1 rounded-lg bg-red-500 hover:bg-red-400"
        >
          <TrashIcon
            className="flex-shink-0 h-6 w-6 text-gray-100"
            aria-hidden="true"
          />
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-100 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Confirm deleting order
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Do you really want to cancel your order?
                  </p>
                </div>
                <div className="flex justify-around">
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                      onClick={() => {
                        dispatch(deleteOrder({ id: order.orderId }));
                        closeModal();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
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
          {!order.payment.hasTimedOut && (
            <>
              {order.createdAt ? (
                <p>
                  {t("orderTime")}: {order.createdAt.substring(0, 10)}{" "}
                  {order.createdAt.substring(11, 16)} GMT
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
              <p className="text-2xl">{order.product.name} </p>
              <p className="font-bold text-xl text-red-500">
                {order.product.totalPrice} DZD
              </p>
              {order.payment.wasDeclined && (
                <div className="py-1 px-3 text-red-800 font-bold border-2 border-red-300 bg-red-100 rounded-lg">
                  {t("paymentDeclined")}
                </div>
              )}
              {order.payment.receipt && (
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
          )}
        </div>
      </div>
      {order.payment.hasTimedOut ? (
        <div className="flex flex-col items-center lg:flex-row lg:justify-end py-2 px-3">
          <div>{t("hasTimedOut")}</div>
        </div>
      ) : (
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
      )}
    </div>
  );
};
