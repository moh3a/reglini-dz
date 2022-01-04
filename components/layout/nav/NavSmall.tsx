import { Fragment } from "react";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import Avatar from "../../elements/Avatar";
import SelectLanguage from "../../elements/SelectLanguage";
import ToggleDark from "../../elements/ToggleDark";

const NavSmall = ({ open, setOpen, user, placeholder }: any) => {
  const t = useTranslations("navigation");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-100 lg:hidden"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative max-w-xs w-full bg-white dark:bg-grim shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div className="mb-4 px-4 pt-5 pb-2 flex">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-800 dark:text-gray-100"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              {placeholder ? (
                <div className="flow-root">user data</div>
              ) : user && user.email ? (
                <>
                  <div className="flow-root">
                    <Link href="/account" passHref>
                      <div
                        onClick={() => setOpen(false)}
                        className="max-w-xs p-2 rounded-full flex items-center text-sm focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                      >
                        <span className="sr-only">Open user menu</span>
                        <Avatar picture={user.picture} />
                        <span className="-m-2 p-2 ml-6 block font-medium text-gray-800 dark:text-gray-100 ">
                          {user.name}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/account/wishlist" passHref>
                      <a
                        onClick={() => setOpen(false)}
                        className="-m-2 p-2 pl-4 max-w-xs rounded-full font-medium block  text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
                      >
                        {t("wishlist")}
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/account/orders" passHref>
                      <a
                        onClick={() => setOpen(false)}
                        className="-m-2 p-2 pl-4 max-w-xs rounded-full block font-medium text-gray-800 dark:text-gray-100  hover:bg-gray-200 dark:hover:bg-gray-800"
                      >
                        {t("orders")}
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <p
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      className="-m-2 p-2 pl-4 max-w-xs rounded-full block font-medium text-gray-800 dark:text-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      {t("signOut")}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flow-root">
                    <Link href="/login" passHref>
                      <a
                        onClick={() => setOpen(false)}
                        className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100"
                      >
                        {t("signIn")}
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/register" passHref>
                      <a
                        onClick={() => setOpen(false)}
                        className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100"
                      >
                        {t("register")}
                      </a>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-6 w-full flex flex-col">
              <div className="text-xl font-bold">Products</div>
              <Link href="/aliexpress" passHref>
                <div onClick={() => setOpen(false)} className="my-3">
                  <h1 className="cursor-pointer text-lg text-black dark:text-white">
                    Aliexpress
                  </h1>
                  <p className="hover:underline cursor-pointer text-sm">
                    Shop Now
                  </p>
                </div>
              </Link>
              <Link href="/meta-ads" passHref>
                <div onClick={() => setOpen(false)} className="my-2">
                  <h1 className="cursor-pointer text-lg text-black dark:text-white">
                    Meta ads{" "}
                    <span className="text-xs cursor-wait rounded-lg border text-facebook border-blue-100 bg-blue-50 p-1">
                      coming soon
                    </span>
                  </h1>
                  <p className="hover:underline cursor-not-allowed text-sm">
                    Sponsor Now
                  </p>
                </div>
              </Link>
              <div className="my-2 text-lg text-black dark:text-white">
                APIs{" "}
                <span className="text-xs cursor-wait rounded-lg border text-gray-600 border-gray-200 bg-gray-100 p-1">
                  coming soon
                </span>
              </div>
              <div className="my-2">
                <h1 className="text-black dark:text-white">
                  reglini-dz Affiliate Program{" "}
                  <span className="text-xs cursor-wait rounded-lg border text-white border-gray-800 bg-gray-600 p-1">
                    coming soon
                  </span>
                </h1>
                <p className="hover:underline cursor-not-allowed text-sm">
                  Join Now
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6 z-0">
              <div className="flow-root hover:bg-gray-200 dark:hover:bg-gray-800 p-2 pl-4 max-w-xs rounded-full font-medium">
                <Link href={t("community.href")} passHref>
                  <a
                    onClick={() => setOpen(false)}
                    className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100"
                  >
                    {t("community.name")}
                  </a>
                </Link>
              </div>
              <div className="flow-root hover:bg-gray-200 dark:hover:bg-gray-800 p-2 pl-4 max-w-xs rounded-full font-medium">
                <Link href={t("currency.href")} passHref>
                  <a
                    onClick={() => setOpen(false)}
                    className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100"
                  >
                    {t("currency.name")}
                  </a>
                </Link>
              </div>
              <div className="flow-root hover:bg-gray-200 dark:hover:bg-gray-800 p-2 pl-4 max-w-xs rounded-full font-medium">
                <Link href={t("support.href")} passHref>
                  <a
                    onClick={() => setOpen(false)}
                    className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100"
                  >
                    {t("support.name")}
                  </a>
                </Link>
              </div>
              <div className="flow-root hover:bg-gray-200 dark:hover:bg-gray-800 p-2 pl-4 max-w-xs rounded-full font-medium">
                <Link href={t("faq.href")} passHref>
                  <a
                    onClick={() => setOpen(false)}
                    className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100"
                  >
                    {t("faq.name")}
                  </a>
                </Link>
              </div>

              <div className="border-t w-full border-gray-200 py-6 px-4 space-y-6 z-0">
                <div className="flex justify-center">
                  <SelectLanguage />
                </div>
                <div className="flex justify-center">
                  <ToggleDark />
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
export default NavSmall;
