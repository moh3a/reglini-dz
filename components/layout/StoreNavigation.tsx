import { Fragment, useState } from "react";
import { useSession, signOut } from "next-auth/client";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Popover, Tab, Transition, Menu } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  XIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { navigation } from "../../data/navigation";
import Logo from "./Logo";
import Cart from "../store/Cart";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function StoreNavigation() {
  const [session, loading] = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      {loading ? (
        <div className="pb-4 bg-white dark:bg-grim w-full z-0 flex justify-center">
          <div>
            <Link href="/" passHref>
              <span>
                <span className="sr-only">reglini.dz</span>
                <Logo width="50" height="50" />
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-grim z-0">
          {/* Mobile menu */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-0 lg:hidden"
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
                    {session ? (
                      <>
                        <div className="flow-root">
                          <Link href="/profile" passHref>
                            <div className="max-w-xs p-2 rounded-full flex items-center text-sm focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
                              <span className="sr-only">Open user menu</span>
                              <Image
                                className="h-10 w-10 rounded-full"
                                src={session.user?.image || "/user-icon.png"}
                                alt={session.user?.name || "user profile image"}
                                height={30}
                                width={30}
                              />
                              <span className="-m-2 p-2 ml-6 block font-medium text-gray-800 dark:text-gray-100 ">
                                {session.user?.name}
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="flow-root">
                          <Link href="/wishlist" passHref>
                            <span className="-m-2 p-2 pl-4 max-w-xs rounded-full block font-medium text-gray-800 dark:text-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800">
                              Your wishlist
                            </span>
                          </Link>
                        </div>
                        <div className="flow-root">
                          <Link href="/orders" passHref>
                            <span className="-m-2 p-2 pl-4 max-w-xs rounded-full block font-medium text-gray-800 dark:text-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800">
                              Your Orders
                            </span>
                          </Link>
                        </div>
                        <div className="flow-root">
                          <Link href="/settings" passHref>
                            <span className="-m-2 p-2 pl-4 max-w-xs rounded-full block font-medium text-gray-800 dark:text-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800">
                              Settings
                            </span>
                          </Link>
                        </div>
                        <div className="flow-root">
                          <p
                            onClick={() => signOut()}
                            className="-m-2 p-2 pl-4 max-w-xs rounded-full block font-medium text-gray-800 dark:text-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                          >
                            Sign Out
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flow-root">
                          <Link href="/login" passHref>
                            <span className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100 cursor-pointer">
                              Sign in
                            </span>
                          </Link>
                        </div>
                        <div className="flow-root">
                          <Link href="/register" passHref>
                            <span className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100 cursor-pointer">
                              Create account
                            </span>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex px-4 space-x-8">
                        {navigation.categories.map((category: any) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "text-indigo-800 border-indigo-800"
                                  : "text-gray-800 dark:text-gray-100 border-transparent",
                                "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category: any) => (
                        <Tab.Panel
                          key={category.name}
                          className="pt-10 pb-8 px-4 space-y-10 z-0"
                        >
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item: any) => (
                              <div
                                key={item.name}
                                className="group relative text-sm"
                              >
                                <div className="p-2 aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden hover:opacity-75">
                                  <Image
                                    className="absolute inset-0 object-center object-cover"
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    height={50}
                                    width={50}
                                    layout="responsive"
                                  />
                                </div>
                                <a
                                  href={item.href}
                                  className="mt-6 block font-medium text-gray-800 dark:text-gray-100"
                                >
                                  <span
                                    className="absolute z-0 inset-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                                <p
                                  aria-hidden="true"
                                  className="mt-1 text-gray-800 dark:text-gray-100"
                                >
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section: any) => (
                            <div key={section.name}>
                              <p
                                id={`${category.id}-${section.id}-heading-mobile`}
                                className="font-medium text-gray-800 dark:text-gray-100"
                              >
                                {section.name}
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item: any) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-2 p-2 block text-gray-800 dark:text-gray-100"
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="border-t border-gray-200 py-6 px-4 space-y-6 z-0">
                    {navigation.pages.map((page: any) => (
                      <div key={page.name} className="flow-root">
                        <a
                          href={page.href}
                          className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100"
                        >
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

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
                      {navigation.categories.map((category: any) => (
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
                                          {category.featured.map(
                                            (item: any) => (
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
                                                <a
                                                  href={item.href}
                                                  className="mt-6 block font-medium text-gray-800 dark:text-gray-100"
                                                >
                                                  <span
                                                    className="absolute z-0 inset-0"
                                                    aria-hidden="true"
                                                  />
                                                  {item.name}
                                                </a>
                                                <p
                                                  aria-hidden="true"
                                                  className="mt-1 text-gray-800 dark:text-gray-100"
                                                >
                                                  Shop now
                                                </p>
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                          {category.sections.map(
                                            (section: any) => (
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
                                                  {section.items.map(
                                                    (item: any) => (
                                                      <li
                                                        key={item.name}
                                                        className="flex"
                                                      >
                                                        <a
                                                          href={item.href}
                                                          className="text-gray-800 dark:text-gray-100 hover:text-grim dark:hover:text-gray-400"
                                                        >
                                                          {item.name}
                                                        </a>
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              </div>
                                            )
                                          )}
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

                      {navigation.pages.map((page: any) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-800 dark:text-gray-100 hover:text-grim dark:hover:text-gray-400"
                        >
                          {page.name}
                        </a>
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
                                  <span className="sr-only">
                                    Open user menu
                                  </span>
                                  <Image
                                    className="h-10 w-10 rounded-full"
                                    src={
                                      session.user?.image || "/user-icon.png"
                                    }
                                    alt={
                                      session.user?.name || "user profile image"
                                    }
                                    height={30}
                                    width={30}
                                  />
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
                                      <Link href="/profile" passHref>
                                        <p
                                          className={classNames(
                                            active
                                              ? "bg-gray-200 dark:bg-gray-800"
                                              : "",
                                            "block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer"
                                          )}
                                        >
                                          Your Profile
                                        </p>
                                      </Link>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link href="/wishlist" passHref>
                                        <p
                                          className={classNames(
                                            active
                                              ? "bg-gray-200 dark:bg-gray-800"
                                              : "",
                                            "block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer"
                                          )}
                                        >
                                          Your Wishlist
                                        </p>
                                      </Link>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link href="/orders" passHref>
                                        <p
                                          className={classNames(
                                            active
                                              ? "bg-gray-200 dark:bg-gray-800"
                                              : "",
                                            "block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer"
                                          )}
                                        >
                                          Your Orders
                                        </p>
                                      </Link>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link href="/settings" passHref>
                                        <p
                                          className={classNames(
                                            active
                                              ? "bg-gray-200 dark:bg-gray-800"
                                              : "",
                                            "block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer"
                                          )}
                                        >
                                          Settings
                                        </p>
                                      </Link>
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
                                        Sign out
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
                              Sign in
                            </span>
                          </Link>
                          <span
                            className="h-6 w-px bg-gray-200"
                            aria-hidden="true"
                          />
                          <Link href="/register" passHref>
                            <span className="text-sm font-medium text-gray-800 hover:text-grim dark:text-gray-100 dark:hover:text-gray-400 cursor-pointer">
                              Create account
                            </span>
                          </Link>
                        </>
                      )}
                    </div>

                    {/* Search */}
                    <div className="flex lg:ml-6">
                      <a
                        href="#"
                        className="p-2 text-gray-800 hover:text-grim dark:text-gray-100 dark:hover:text-gray-400"
                      >
                        <span className="sr-only">Search</span>
                        <SearchIcon className="w-6 h-6" aria-hidden="true" />
                      </a>
                    </div>

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
        </div>
      )}
    </>
  );
}
