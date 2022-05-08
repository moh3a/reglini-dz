/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Dialog, Transition } from "@headlessui/react";

import {
  searchAEProductByName,
  getAEProductInfo,
} from "../../utils/redux/aeapiAsyncActions";

const SearchAE = ({ url, setUrl }: any) => {
  const t = useTranslations("Aliexpress");
  const dispatch = useDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  let locale = "en";
  if (router.locale === "ar") {
    locale = "ar_MA";
  } else if (router.locale === "fr") {
    locale = "fr_FR";
  } else {
    locale = "en_US";
  }

  const getByIdQueryHandler = (e: any) => {
    e.preventDefault();
    if (url.includes("aliexpress.com/item/")) {
      const firstSplit = url.split("/item/");
      const secondSplit = firstSplit[1].split(".html");
      dispatch(getAEProductInfo({ id: secondSplit[0], locale }));
    } else {
      dispatch(searchAEProductByName({ name: url, locale }));
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-grim">
      <div className="container flex flex-col px-5 py-8 mx-auto lg:items-center">
        <div className="flex flex-col w-full mb-8 text-left lg:text-center">
          <div className="flex justify-center items-center">
            <img src="/aliexpress-ar21.svg" alt="aliexpress logo" />
          </div>
          <h1 className="mb-4 text-xs font-semibold tracking-widest text-center uppercase title-font">
            {t("hereStarts")}
          </h1>
          <h2 className="mx-auto mb-6 text-4xl text-center font-semibold leading-none tracking-tighter text-aliexpress lg:w-1/2 lg:text-6xl title-font">
            {t("aeHands")}
          </h2>
          <form
            onSubmit={getByIdQueryHandler}
            className={`flex flex-col ${
              router.locale === "ar" ? "md:flex-row-reverse" : "md:flex-row"
            }  items-center mt-8 lg:mx-auto justify-center lg:w-1/2`}
          >
            <div className="md:mr-2 w-full">
              <input
                className={`${
                  router.locale === "ar" && "text-right"
                } flex-grow w-full px-4 py-2 mb-4 mr-4 text-base text-black transition duration-650 ease-in-out transform rounded-lg bg-gray-200 focus:outline-none focus:border-red-500 md:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 focus:ring-red-500 ring-offset-current ring-offset-2`}
                type="text"
                id="url"
                name="url"
                placeholder="exemple: watch, xt91, coat ... or https://www.aliexpress.com/item/xxxxxxx"
                autoComplete="off"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              className="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-aliexpress rounded-lg hover:opacity-60 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
              type="submit"
            >
              {t("find")}
            </button>
          </form>
          <p className="mt-2 mb-8 text-xs lg:text-sm text-center lg:mx-auto lg:w-1/3 ">
            {t("happyShopping")}
          </p>
          <div className="flex justify-center items-center">
            <button
              onClick={openModal}
              className="border border-aliexpress text-aliexpress text-sm md:text-base dark:bg-black bg-white py-1 px-3 rounded-lg"
            >
              {t("speceficItem")}
            </button>
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
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {t("workHow")}
                      </Dialog.Title>
                      <div className="my-2">
                        <p className="text-sm text-gray-500">{t("workDesc")}</p>
                      </div>
                      <div>
                        <img
                          className="rounded-lg"
                          src="/aliexpress-screenshot.jpg"
                          alt="aliexpress URL copy screenshot"
                        />
                      </div>
                      <div className="flex justify-around">
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                            onClick={closeModal}
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SearchAE;
