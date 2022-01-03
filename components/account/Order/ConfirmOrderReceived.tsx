/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";

function Tracking({ order }: any) {
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
      {order.status !== "COMPLETE" && order.status !== "AWAITING_PAYMENT" && (
        <div>
          <button
            className="bg-indigo-200 px-4 py-1 my-1 lg:mx-1 rounded-lg hover:bg-indigo-300 dark:bg-indigo-400"
            onClick={openModal}
          >
            Confirm Order Received
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
                  Confirm order received
                </Dialog.Title>
                {/* payment UI */}
                Hello
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
