import { Fragment } from "react";
import { signOut } from "next-auth/client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { navigation } from "../../../data/navigation";
import ProfilePicture from "../../elements/ProfilePicture";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const NavSmall = ({ open, setOpen, session, user }: any) => {
  const t = useTranslations("navigation");
  const router = useRouter();

  return (
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
                    <Link href="/account" passHref>
                      <div className="max-w-xs p-2 rounded-full flex items-center text-sm focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
                        <span className="sr-only">Open user menu</span>
                        <ProfilePicture user={user} />
                        <span className="-m-2 p-2 ml-6 block font-medium text-gray-800 dark:text-gray-100 ">
                          {session.user?.name}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/account/wishlist" passHref>
                      <a className="-m-2 p-2 pl-4 max-w-xs rounded-full block font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800">
                        Your wishlist
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/account/orders" passHref>
                      <a className="-m-2 p-2 pl-4 max-w-xs rounded-full block font-medium text-gray-800 dark:text-gray-100  hover:bg-gray-200 dark:hover:bg-gray-800">
                        {t("orders")}
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/account/settings" passHref>
                      <a className="-m-2 p-2 pl-4 max-w-xs rounded-full block font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800">
                        Settings
                      </a>
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
                      <a className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100">
                        {t("signIn")}
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/register" passHref>
                      <a className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100">
                        {t("register")}
                      </a>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Links */}
            <Tab.Group as="div" className="mt-2">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex px-4 space-x-8">
                  {navigation.en.categories.map((category: any) => (
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
                {navigation.en.categories.map((category: any) => (
                  <Tab.Panel
                    key={category.name}
                    className="pt-10 pb-8 px-4 space-y-10 z-0"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item: any) => (
                        <div key={item.name} className="group relative text-sm">
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
                          <Link href={item.href} passHref>
                            <a>
                              <span
                                className="mt-6 block font-medium text-gray-800 dark:text-gray-100 absolute z-0 inset-0 cursor-pointer"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </Link>
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
                              <Link href={item.href} passHref>
                                <a className="-m-2 p-2 block text-gray-800 dark:text-gray-100">
                                  {item.name}
                                </a>
                              </Link>
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
              {navigation.en.pages.map((page: any) => (
                <div key={page.name} className="flow-root">
                  <Link href={page.href} passHref>
                    <a className="-m-2 p-2 block font-medium text-gray-800 dark:text-gray-100">
                      {page.name}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
export default NavSmall;
