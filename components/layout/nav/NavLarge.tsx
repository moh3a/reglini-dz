import { Fragment } from "react";
import { signOut } from "next-auth/client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Popover, Transition, Menu } from "@headlessui/react";
import { MenuIcon, HeartIcon } from "@heroicons/react/outline";

import { navigation } from "../../../data/navigation";
import Logo from "../Logo";
import Cart from "../../store/Cart";
import Search from "../../Search";
import ProfilePicture from "../../elements/ProfilePicture";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const NavLarge = ({ setOpen, session, user }: any) => {
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
              className="bg-white dark:bg-grim p-2 rounded-md text-gray-800 dark:text-gray-100 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link href="/" passHref>
                <span>
                  <span className="sr-only">reglini.dz</span>
                  <Logo width="50" height="50" />
                </span>
              </Link>
            </div>

            {/* Flyout menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="h-full flex space-x-8 z-0">
                {navigation.en.categories.map((category: any) => (
                  <Popover key={category.name} className="flex">
                    {({ open }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button
                            className={classNames(
                              open
                                ? "border-indigo-800 text-indigo-800"
                                : "border-transparent text-gray-800 hover:text-grim dark:text-gray-100 dark:hover:text-gray-400",
                              "relative z-0 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                            )}
                          >
                            {category.name}
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
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow"
                              aria-hidden="true"
                            />

                            <div className="relative bg-white dark:bg-grim">
                              <div className="max-w-7xl mx-auto px-8">
                                <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item: any) => (
                                      <div
                                        key={item.name}
                                        className="group relative text-base sm:text-sm"
                                      >
                                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                          <div className="p-2 object-center object-cover">
                                            <Image
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              height={200}
                                              width={200}
                                            />
                                          </div>
                                        </div>
                                        <Link href={item.href} passHref>
                                          <>
                                            <span
                                              className=" absolute z-0 inset-0 cursor-pointer"
                                              aria-hidden="true"
                                            />
                                            <span className="mt-6 block font-medium text-gray-800 dark:text-gray-100">
                                              {item.name}
                                            </span>
                                          </>
                                        </Link>
                                        <p
                                          aria-hidden="true"
                                          className="mt-1 text-gray-800 dark:text-gray-100"
                                        >
                                          {t("shopNow")}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                    {category.sections.map((section: any) => (
                                      <div key={section.name}>
                                        <p
                                          id={`${section.name}-heading`}
                                          className="font-medium text-gray-800 dark:text-gray-100"
                                        >
                                          {section.name}
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map((item: any) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <Link href={item.href} passHref>
                                                <span className="text-gray-800 dark:text-gray-100 hover:text-grim dark:hover:text-gray-400 cursor-pointer">
                                                  {item.name}
                                                </span>
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ))}

                {navigation.en.pages.map((page: any) => (
                  <Link key={page.name} href={page.href} passHref>
                    <span className="flex items-center text-sm font-medium text-gray-800 dark:text-gray-100 hover:text-grim dark:hover:text-gray-400 cursor-pointer">
                      {page.name}
                    </span>
                  </Link>
                ))}
              </div>
            </Popover.Group>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {session ? (
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <p className="p-1 text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-200 hover:underline cursor-pointer">
                        <span className="sr-only">Username</span>
                        {session.user?.name}
                      </p>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <ProfilePicture user={user} />
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
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-100 dark:bg-grim ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <p
                                  className={classNames(
                                    active
                                      ? "bg-gray-200 dark:bg-gray-800"
                                      : "",
                                    "block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer"
                                  )}
                                >
                                  <Link href="/profile">{t("profile")}</Link>
                                </p>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <p
                                  className={classNames(
                                    active
                                      ? "bg-gray-200 dark:bg-gray-800"
                                      : "",
                                    "block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer"
                                  )}
                                >
                                  <Link href="/wishlist">{t("wishlist")}</Link>
                                </p>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <p
                                  className={classNames(
                                    active
                                      ? "bg-gray-200 dark:bg-gray-800"
                                      : "",
                                    "block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer"
                                  )}
                                >
                                  <Link href="/orders">{t("orders")}</Link>
                                </p>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <p
                                  className={classNames(
                                    active
                                      ? "bg-gray-200 dark:bg-gray-800"
                                      : "",
                                    "block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer"
                                  )}
                                >
                                  <Link href="/settings">{t("settings")}</Link>
                                </p>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <p
                                  onClick={() => signOut()}
                                  className={classNames(
                                    active
                                      ? "bg-gray-200 dark:bg-gray-800"
                                      : "",
                                    "block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer"
                                  )}
                                >
                                  {t("signOut")}
                                </p>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link href="/login" passHref>
                      <span className="text-sm font-medium text-gray-800 hover:text-grim dark:text-gray-100 dark:hover:text-gray-400 cursor-pointer">
                        {t("signIn")}
                      </span>
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link href="/register" passHref>
                      <span className="text-sm font-medium text-gray-800 hover:text-grim dark:text-gray-100 dark:hover:text-gray-400 cursor-pointer">
                        {t("register")}
                      </span>
                    </Link>
                  </>
                )}
              </div>

              {/* Search */}
              <Search />

              {/* Wishlist */}
              <div className="flex lg:ml-4">
                <Link href="/wishlist" passHref>
                  <span className="p-2 text-gray-800 hover:text-grim dark:text-gray-100 dark:hover:text-gray-400 cursor-pointer">
                    <span className="sr-only">Wishist</span>
                    <HeartIcon className="w-6 h-6" aria-hidden="true" />
                  </span>
                </Link>
              </div>

              {/* Cart */}
              <Cart session={session} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default NavLarge;
