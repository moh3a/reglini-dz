import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";

export default function Search() {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex lg:ml-6" onClick={openModal}>
        <a
          href="#"
          className="p-2 text-gray-800 hover:text-grim dark:text-gray-100 dark:hover:text-gray-400"
        >
          <span className="sr-only">Search</span>
          <SearchIcon className="w-6 h-6" aria-hidden="true" />
        </a>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 dark:bg-opacity-75" />
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-gray-100 dark:bg-grim border-2 border-yellow-200 shadow rounded-2xl">
                <Dialog.Title className="text-black dark:text-yellow-100">
                  Search
                </Dialog.Title>
                {/* <Dialog.Description>From here.</Dialog.Description> */}
                <div>
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <SearchIcon
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="focus:ring-yellow-200 block w-full pl-7 pr-12 sm:text-sm border-yellow-200 rounded-lg"
                      placeholder="type here..."
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label htmlFor="products" className="sr-only">
                        Products
                      </label>
                      <select
                        id="products"
                        name="products"
                        className="focus:ring-pink-50 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500  sm:text-sm rounded-md"
                      >
                        <option>reglini-dz</option>
                        <option>aliexpress</option>
                        <option>netflix</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  className="inline-flex justify-center px-4 py-2 mt-2 text-sm font-medium text-gray-100 dark:text-gray-800 bg-grim dark:bg-gray-200 border border-transparent rounded-md hover:bg-gray-800 dark:hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Search
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
