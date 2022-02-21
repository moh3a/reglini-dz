/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Popover, Transition, Menu } from "@headlessui/react";
import { MenuIcon, HeartIcon } from "@heroicons/react/outline";

import Logo from "../Logo";
import Cart from "../../store/Cart";
import Search from "../../elements/Search";
import Avatar from "../../elements/Avatar";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const NavLarge = ({ setOpen, user, placeholder }: any) => {
  const t = useTranslations("navigation");
  const router = useRouter();

  return (
    <header className="relative bg-white dark:bg-grim">
      <nav
        aria-label="Top"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-0"
      >
        <div className="border-b border-gray-200">
          <div className="h-16 flex items-center">
            <button
              type="button"
              className="bg-white dark:bg-grim p-2 rounded-md text-gray-800  dark:text-gray-100 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link href="/" passHref>
                <a>
                  <span className="sr-only">reglini-dz</span>
                  <Logo width="50" height="50" />
                </a>
              </Link>
            </div>

            {/* Flyout menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="h-full flex space-x-8 z-0">
                <Popover className="flex">
                  {({ open }) => (
                    <>
                      <div className="relative flex">
                        <Popover.Button
                          className={classNames(
                            open
                              ? "border-gray-600 text-gray-600 dark:text-gray-400 dark:border-gray-200"
                              : "border-transparent text-gray-800 hover:text-gray-400 dark:text-gray-100 dark:hover:text-gray-400",
                            "relative z-0 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                          )}
                        >
                          {t("products")}
                        </Popover.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel className="absolute top-full z-30 inset-x-0 text-sm text-gray-500">
                          <div
                            className="absolute inset-0 top-1/2 bg-white shadow"
                            aria-hidden="true"
                          />

                          <div className="flex relative bg-white dark:bg-grim">
                            <div className="my-4 mr-1 ml-10 w-full flex justify-around">
                              <div>
                                <Link href="/aliexpress" passHref>
                                  <div className="my-3 mx-3">
                                    <h1 className="cursor-pointer text-lg text-black dark:text-white">
                                      Aliexpress
                                    </h1>
                                    <p className="hover:underline cursor-pointer text-sm">
                                      Shop Now
                                    </p>
                                  </div>
                                </Link>
                                <Link href="/meta-ads" passHref>
                                  <div className="my-3 mx-3">
                                    <h1 className="cursor-pointer text-lg text-black dark:text-white">
                                      Meta ads
                                    </h1>
                                    <p className="hover:underline text-sm">
                                      Sponsor Now
                                    </p>
                                  </div>
                                </Link>
                              </div>
                              <div>
                                <div className="my-3 mx-3">
                                  <h1 className="text-lg text-black dark:text-white">
                                    APIs{" "}
                                    <span className="text-xs cursor-wait rounded-lg border text-gray-600 border-gray-200 bg-gray-100 p-1">
                                      coming soon
                                    </span>
                                  </h1>
                                  <p className="hover:underline cursor-not-allowed text-sm">
                                    - Parallel market currency exchange API
                                  </p>
                                  <p className="hover:underline cursor-not-allowed text-sm">
                                    - Algeria&apos;s zip codes API
                                  </p>
                                </div>
                                <div className="my-3 mx-3">
                                  <h1 className="text-lg text-black dark:text-white">
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
                            </div>
                            <div className="my-4 mx-1 w-full flex justify-around">
                              <Link href="/aliexpress" passHref>
                                <div className="cursor-pointer flex justify-center items-center h-40 w-40 border border-gray-200 bg-gray-100 hover:border-gray-400 dark:border-yellow-200 dark:bg-grim dark:hover:border-yellow-400 rounded-lg relative mt-2 mb-6">
                                  <div className="w-20 h-20">
                                    <img
                                      src="/aliexpress-icon.png"
                                      alt="aliexpress logo"
                                    />
                                  </div>
                                  <div className="absolute w-full top-40 text-center">
                                    Aliexpress
                                  </div>
                                </div>
                              </Link>
                              <Link href="/meta-ads" passHref>
                                <div className="cursor-pointer flex justify-center items-center h-40 w-40 border border-gray-200 hover:border-gray-400 bg-gray-100 dark:border-blue-400 dark:bg-grim rounded-lg dark:hover:border-blue-600 relative mt-2 mb-6">
                                  <div className="w-40 h-40">
                                    <img src="/meta-icon.png" alt="meta logo" />
                                  </div>
                                  <div className="absolute w-full top-40 text-center">
                                    Meta Ads
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                <Link href={t("community.href")} passHref>
                  <a className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-400 dark:text-gray-100 hover:text-grim dark:hover:text-gray-400">
                    {t("community.name")}
                  </a>
                </Link>
                <Link href={t("currency.href")} passHref>
                  <a className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-400 dark:text-gray-100 hover:text-grim dark:hover:text-gray-400">
                    {t("currency.name")}
                  </a>
                </Link>
                <Link href={t("support.href")} passHref>
                  <a className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-400 dark:text-gray-100 hover:text-grim dark:hover:text-gray-400">
                    {t("support.name")}
                  </a>
                </Link>
                <Link href={t("faq.href")} passHref>
                  <a className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-400 dark:text-gray-100 hover:text-grim dark:hover:text-gray-400">
                    {t("faq.name")}
                  </a>
                </Link>
              </div>
            </Popover.Group>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {placeholder ? (
                  <div className="hidden md:block">
                    {/* <div className="ml-4 flex items-center md:ml-6">
                      user data
                    </div> */}
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
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <p className="p-1 text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 hover:underline cursor-pointer">
                        <span className="sr-only">Username</span>
                        {user.name}
                      </p>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <Avatar picture={user.picture} />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-100 dark:bg-grim ring-1 ring-black border-2 border-yellow-200 ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/account">
                                  <a
                                    className={classNames(
                                      active
                                        ? "bg-gray-200 dark:bg-gray-800"
                                        : "",
                                      "block px-4 py-2 text-sm text-black dark:text-yellow-100 hover:bg-yellow-200 dark:hover:text-black"
                                    )}
                                  >
                                    {t("profile")}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/account/wishlist">
                                  <a
                                    className={classNames(
                                      active
                                        ? "bg-gray-200 dark:bg-gray-800"
                                        : "",
                                      "block px-4 py-2 text-sm text-black dark:text-yellow-100 hover:bg-yellow-200 dark:hover:text-black"
                                    )}
                                  >
                                    {t("wishlist")}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/account/orders">
                                  <a
                                    className={classNames(
                                      active
                                        ? "bg-gray-200 dark:bg-gray-800"
                                        : "",
                                      "block px-4 py-2 text-sm text-black dark:text-yellow-100 hover:bg-yellow-200 dark:hover:text-black"
                                    )}
                                  >
                                    {t("orders")}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={() => signOut()}
                                  className={classNames(
                                    active
                                      ? "bg-gray-200 dark:bg-gray-800"
                                      : "",
                                    "block px-4 py-2 text-sm text-black dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-200 dark:hover:text-black cursor-pointer"
                                  )}
                                >
                                  {t("signOut")}
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/login" passHref>
                      <a className="text-sm font-medium text-gray-800 hover:text-grim dark:text-gray-100 dark:hover:text-gray-400 ">
                        {t("signIn")}
                      </a>
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link href="/auth/register" passHref>
                      <a className="text-sm font-medium text-gray-800 hover:text-grim dark:text-gray-100 dark:hover:text-gray-400 ">
                        {t("register")}
                      </a>
                    </Link>
                  </>
                )}
              </div>

              {/* <Search /> */}

              {/* Wishlist */}
              <div className="flex lg:ml-4">
                <Link href="/account/wishlist" passHref>
                  <a className="p-2 text-gray-800 hover:text-grim dark:text-gray-100 dark:hover:text-gray-400">
                    <span className="sr-only">Wishist</span>
                    <HeartIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </Link>
              </div>

              {/* Cart */}
              <Cart user={user} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default NavLarge;
