/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";

import { selectUser } from "../../../utils/redux/userSlice";
import { submitFeedback } from "../../../utils/redux/userAsyncActions";
import Feedback from "../../elements/Feedback";
import { IAEOrderDetails } from "../../../types/AETypes";

function ConfirmOrderReceived({ order }: { order: IAEOrderDetails }) {
  const [message, setMessage] = useState("");
  const [rate, setRate] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [wait, setWait] = useState(false);
  const [image, setImage] = useState<any>();
  const [createObjectURL, setCreateObjectURL] = useState<string>();
  const t = useTranslations("Orders");
  const dispatch = useDispatch();
  const { status } = useSelector(selectUser);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event: any) => {
    setWait(true);
    const body = new FormData();
    body.append("file", image);
    body.append("orderId", order.orderId);
    body.append("rate", rate.toString());
    body.append("message", message);
    dispatch(submitFeedback({ body }));
    setTimeout(() => {
      if (status !== "loading") {
        setWait(false);
        closeModal();
      }
    }, 500);
  };

  return (
    <div>
      {order.details.order_status &&
        order.payment.isPaymentConfirmed &&
        !order.packageReceived.wasReceived && (
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
                  className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                >
                  Confirm order received
                </Dialog.Title>
                {/* payment UI */}
                <div>
                  <p>
                    Have you successfully received your package? Take a clear
                    picture of the package you received.
                  </p>
                  <div className="flex flex-col mt-10 ">
                    <input
                      className="mb-2"
                      type="file"
                      accept="image/png, image/jpeg"
                      name="image"
                      onChange={uploadToClient}
                    />
                    {createObjectURL && (
                      <>
                        <div className="shadow w-56 my-2 border border-yellow-200">
                          <img src={createObjectURL} alt="" />
                        </div>
                        <small>{t("doNotMind")}</small>
                      </>
                    )}
                  </div>
                </div>
                <Feedback
                  message={message}
                  setMessage={setMessage}
                  setRate={setRate}
                />
                {wait && (
                  <div className="text-lg text-center text-red-500">
                    <span className="relative top-1 inline-block border-4 border-dashed rounded-full h-5 w-5 border-red-500 animate-spin mr-1" />
                    please wait...
                  </div>
                )}
                <div className="flex flex-col justify-center items-center md:flex-row md:justify-around">
                  <div className="my-1">
                    <button
                      className="h-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 rounded-lg py-1 px-3"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                  {createObjectURL && (
                    <div className="my-1">
                      <button
                        className="h-full flex justify-center items-center bg-green-200 hover:bg-green-300 dark:bg-green-500 rounded-lg py-1 px-3"
                        onClick={uploadToServer}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ConfirmOrderReceived;
