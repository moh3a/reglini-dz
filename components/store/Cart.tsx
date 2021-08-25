import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { XIcon, ShoppingBagIcon } from "@heroicons/react/outline";

import { selectUser, getUser } from "../../utils/redux/userSlice";

export default function Cart({ session }: any) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      _id: "",
      name: "",
      slug: "",
      price: 0,
      countInStock: 0,
      imageUrl: "",
      quantity: 0,
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

  // const qtyChangeHandler = (
  //   productId: ICartItem["productId"],
  //   quantity: ICartItem["quantity"],
  //   token: IAuth["token"] = authtoken
  // ) => {
  //   dispatch(updateItemQuantity({ productId, quantity, token }));
  // };

  // const removeFromCartHandler = (
  //   productId: ICartItem["productId"],
  //   token: IAuth["token"] = authtoken
  // ) => {
  //   dispatch(removeItemFromCart({ productId, token }));
  // };

  return (
    <>
      <div className="ml-3 flow-root lg:ml-6">
        <div
          className="group -m-2 p-2 flex items-center cursor-pointer"
          onClick={() => setOpen(true)}
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

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpen}
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
                            onClick={() => setOpen(false)}
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
                              items.map((item) => (
                                <li key={item._id} className="py-6 flex">
                                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <Image
                                      src={
                                        item.imageUrl
                                          ? item.imageUrl
                                          : "/placeholder.png"
                                      }
                                      alt={item.name ? item.name : ""}
                                      height={100}
                                      width={100}
                                      className="w-full h-full object-center object-cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-800 dark:text-gray-100">
                                        <h3>
                                          <a href={item.slug}>{item.name}</a>
                                        </h3>
                                        <p className="ml-4">{item.price}</p>
                                      </div>
                                      {/* <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                                      {item.color}
                                    </p> */}
                                    </div>
                                    <div className="flex-1 flex items-end justify-between text-sm">
                                      <p className="text-gray-600 dark:text-gray-200">
                                        Qty {item.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-red-600 hover:text-red-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
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
                        <p>{user ? user.cart.subtotal : "0"} DZD</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-800 dark:text-gray-100">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-800 hover:bg-green-900"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-800 dark:text-gray-100">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="text-gray-600 dark:text-gray-200 font-medium hover:text-gray-500 dark:hover:text-gray-300"
                            onClick={() => setOpen(false)}
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
