import { Fragment } from "react";
import { signOut } from "next-auth/client";
import Link from "next/link";
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
                <div className="flow-root">
                  <svg
                    role="status"
                    className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
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
                  {user.role === "admin" && (
                    <div className="flow-root">
                      <Link href="/admin" passHref>
                        <a
                          onClick={() => setOpen(false)}
                          className="-m-2 p-2 pl-4 max-w-xs rounded-full font-medium block  text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
                        >
                          Admin
                        </a>
                      </Link>
                    </div>
                  )}
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
                    <Link href="/auth/login" passHref>
                      <a
                        onClick={() => setOpen(false)}
                        className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100"
                      >
                        {t("signIn")}
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/auth/register" passHref>
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
              <div className="text-xl font-bold">{t("products")}</div>
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
                    Meta ads
                  </h1>
                  <p className="hover:underline text-sm">Sponsor Now</p>
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
