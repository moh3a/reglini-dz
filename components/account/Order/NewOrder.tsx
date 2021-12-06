import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import {
  createOrder,
  removeFromCart,
} from "../../../utils/redux/userAsyncActions";
import { selectUser } from "../../../utils/redux/userSlice";
import { ActionFeedback } from "../../aliexpress/ProductActions";
import Address from "../Address/Address";
import PhoneNumber from "../PhoneNumber";
import RealName from "../RealName";

export default function NewOrder({ user, products, origin }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { message } = useSelector(selectUser);

  const placeOrderHandler = () => {
    products.map((item: any) => {
      dispatch(
        createOrder({
          product: {
            productId: item.productId,
            sku: item.sku,
            imageUrl: item.imageUrl,
            price: item.price,
            properties: item.properties,
            quantity: item.quantity,
            carrierId: item.carrierId,
            orderMemo:
              "Please do not put invoices or any other document inside the package. Instead send them to this email address support@reglini-dz.com. Thank you very much.",
          },
          shippingAddress: {
            name: user.realName,
            phoneCountry: "+213",
            mobilePhone: user.phoneNumber.replace("+213", "0"),
            addressLine1: user.address.streetName,
            city: user.address.commune,
            province: user.address.wilaya,
            countryCode: "DZ",
            zipCode: user.address.postalCode,
          },
        })
      );
    });
    if (origin === "localStorage") {
      localStorage.removeItem("aeno");
    } else if (origin === "cart") {
      products.map((item: any) => {
        dispatch(removeFromCart({ id: item.productId }));
      });
    }
    router.push("/account/orders");
  };

  return (
    <div className="border-t border-b mb-12 border-yellow-200 bg-white dark:bg-grim text-black dark:text-white shadow overflow-hidden sm:rounded-lg">
      <ActionFeedback message={message} />
      <div className="px-4 pb-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium">Place a new order</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 dark:bg-grim px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">Real name and family name</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <RealName user={user} />
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 dark:bg-grim px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium">Address</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <Address user={user} />
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 dark:bg-grim px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">Phone Number</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              <PhoneNumber user={user} />
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 dark:bg-grim px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">Payment</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              <p>
                A payment should be submitted in less than 48 hours or the order
                will be automatically cancelled. You can pay once the order was
                created.
              </p>
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 dark:bg-grim px-4 py-5 sm:px-6">
            <dt className="text-sm h-full font-medium ">Products</dt>
            <div>
              {products.map((item: any) => (
                <dd
                  key={item.productId}
                  className="flex border border-gray-200 flex-row my-1 text-sm  sm:col-span-2"
                >
                  {item.imageUrl && (
                    <div className="w-72 md:w-44 rounded-lg">
                      <Image
                        className=""
                        src={item.imageUrl}
                        alt={item.name}
                        height={300}
                        width={300}
                      />
                    </div>
                  )}
                  <div className="flex flex-col px-4 py-2">
                    <p className="font-bold text-lg">{item.name}</p>
                    <p>Product price: {item.price} DZD</p>
                    <p>Shipping price: {item.shippingPrice} DZD</p>
                    <p>Quantity: {item.quantity}</p>
                    <p className="text-lg">
                      Total price: {item.totalPrice} DZD
                    </p>
                  </div>
                </dd>
              ))}
            </div>
          </div>
        </dl>
      </div>
      <div className="w-full flex justify-end my-3">
        {user.realName &&
        user.address &&
        user.phoneNumber &&
        ((user.account === "credentials" && user.verified) ||
          user.account === "oauth") ? (
          <>
            <button
              onClick={placeOrderHandler}
              className="border-2 border-blue-100 p-2 mx-5 rounded-lg"
            >
              Place your order
            </button>
          </>
        ) : (
          <>
            <p>In order to place an order, you have to:</p>
            <ul>
              {user.realName ? "" : <li>Add your real identity name.</li>}
              {user.address ? "" : <li>Add a shipping address.</li>}
              {user.phoneNumber ? "" : <li>Add a phone number.</li>}
              {user.account === "credentials" ? (
                user.verified ? (
                  ""
                ) : (
                  <li>Verify your email address.</li>
                )
              ) : (
                ""
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
