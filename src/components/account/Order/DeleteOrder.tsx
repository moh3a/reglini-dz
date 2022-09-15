import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { TrashIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { deleteOrder } from "../../../utils/redux/userAsyncActions";

function DeleteOrder({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Orders");
  const dispatch = useDispatch();
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-grim shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  {t("titleConfirmDeletingOrder")}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {t("confirmDeletingOrder")}
                  </p>
                </div>
                <div className="flex justify-around">
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 dark:bg-red-400 border border-transparent rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                      onClick={() => {
                        dispatch(deleteOrder({ id }));
                        closeModal();
                        router.replace("/account/orders");
                      }}
                    >
                      {t("deletePrompt")}
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 dark:bg-gray-400 border border-transparent rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                      onClick={closeModal}
                    >
                      {t("cancelPrompt")}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default DeleteOrder;
