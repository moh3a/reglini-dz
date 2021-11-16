import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { XIcon, ShoppingBagIcon } from "@heroicons/react/outline";

import CartItem from "./CartItem";
import { selectUser } from "../../utils/redux/userSlice";
import { getUser } from "../../utils/redux/userAsyncActions";

export default function Cart({ session }: any) {
  const [openCart, setOpenCart] = useState(false);
  const [items, setItems] = useState([
    {
      productId: "",
      name: "",
      price: 0,
      imageUrl: "",
      properties: {},
      quantity: 0,
      shipping: "",
    },
  ]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, status, user } = useSelector(selectUser);

  useEffect(() => {
    if (!isAuthenticated && session && status !== "loading") {
      const email = session.user?.email;
      const type = session.user?.type;
      const provider = session.user?.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [router, session, dispatch, isAuthenticated, status]);

  useEffect(() => {
    if (user) {
      setItems(user.cart.cartItems);
    } else {
      setItems([]);
    }
  }, [user]);

  return (
    <>
      <div className="ml-3 flow-root lg:ml-6">
        <div
          className="group -m-2 p-2 flex items-center cursor-pointer"
          onClick={() => setOpenCart(true)}
        >
          <ShoppingBagIcon
            className="flex-shink-0 h-6 w-6 text-gray-800 dark:text-gray-100 group-hover:text-grim dark:group-hover:text-gray-400"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-100 group-hover:text-grim dark:group-hover:text-gray-400">
            {user ? user.cart.count : "0"}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </div>
      </div>

      <Transition.Root show={openCart} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpenCart}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white dark:bg-grim shadow-xl overflow-y-scroll">
                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-800 dark:text-gray-100">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpenCart(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {items.length > 0 ? (
                              items.map((item) => {
                                return (
                                  <CartItem key={item.productId} item={item} />
                                );
                              })
                            ) : (
                              <li className="py-6 flex">Your cart is empty.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-800 dark:text-gray-100">
                        <p>Subtotal</p>
                        <p>€ {user ? user.cart.subtotal : "0"}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-800 dark:text-gray-100">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link href="/account/orders/new" passHref>
                          <a className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium cursor-pointer text-white bg-green-800 hover:bg-green-900">
                            Place Order
                          </a>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-800 dark:text-gray-100">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="text-gray-600 dark:text-gray-200 font-medium hover:text-gray-500 dark:hover:text-gray-300"
                            onClick={() => setOpenCart(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
