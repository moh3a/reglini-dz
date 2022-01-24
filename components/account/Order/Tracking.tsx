/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { LinkIcon } from "@heroicons/react/outline";
import { IAEOrderDetails } from "../../../utils/AETypes";

function Tracking({ order }: { order: IAEOrderDetails }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Orders");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      {order.tracking.hasTracking && (
        <div>
          <button
            className="bg-indigo-200 px-4 py-1 my-1 lg:mx-1 rounded-lg hover:bg-indigo-300 dark:bg-indigo-400"
            onClick={openModal}
          >
            {t("tracking")}
          </button>
        </div>
      )}
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
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-grim shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Tracking information
                </Dialog.Title>

                {/* payment UI */}

                {order.tracking.hasTracking && (
                  <div>
                    <div className="px-4 py-5 sm:px-6">
                      <p className="text-green-500">{t("trackingAvailable")}</p>
                    </div>
                    {order.tracking.details.map((event) => (
                      <p key={event.event_date} className="text-lg font-bold">
                        {event.event_date}
                        {" - "}
                        {event.event_desc}
                      </p>
                    ))}
                    <p className="my-1 border border-gray-200 bg-gray-100 dark:border-yellow-200 dark:bg-black py-1 px-3">
                      The product will be shipped from China to Algeria by{" "}
                      {
                        order.details.logistics_info_list
                          .aeop_order_logistics_info[0].logistics_service
                      }
                      .
                    </p>
                    {/* <p>
                      Estimated progress percentage{" "}
                      <span className="font-semibold">
                        {order.tracking.packages[0].progressPercentage}%
                      </span>
                      .
                    </p> */}
                    <p className="underline font-semibold">
                      <a
                        href={order.tracking.official_website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Follow this link to the carrier&apos;s tracking page{" "}
                        <LinkIcon
                          className="flex-shink-0 h-6 w-6 "
                          aria-hidden="true"
                        />
                      </a>
                    </p>
                  </div>
                )}

                <div className="flex flex-col justify-center items-center md:flex-row md:justify-around">
                  <div className="my-1">
                    <button
                      type="button"
                      className="h-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 rounded-lg py-1 px-3"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Tracking;
