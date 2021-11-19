import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import {
  createOrder,
  removeFromCart,
} from "../../utils/redux/userAsyncActions";
import { selectUser } from "../../utils/redux/userSlice";
import { ActionFeedback } from "../aliexpress/ProductActions";
import Address from "./Address/Address";
import PhoneNumber from "./PhoneNumber";
import RealName from "./RealName";

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
            quantity: item.quantity,
            carrierId: item.carriedId,
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
    // if (origin === "localStorage") {
    //   localStorage.removeItem("aeno");
    // } else if (origin === "cart") {
    //   products.map((item: any) => {
    //     dispatch(removeFromCart({ id: item.productId }));
    //   });
    // }
    router.push("/account/orders");
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <ActionFeedback message={message} />
      <div className="px-4 pb-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Place a new order
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Real name and family name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <RealName user={user} />
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Address user={user} />
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <PhoneNumber user={user} />
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Payment</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              + setup a payment method
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <dt className="text-sm h-full font-medium text-gray-500">
              Products
            </dt>
            <div>
              {products.map((item: any) => (
                <dd
                  key={item.productId}
                  className="flex border border-gray-200 flex-row my-1 text-sm text-gray-900 sm:col-span-2"
                >
                  <div className="w-72 md:w-44 rounded-lg">
                    <Image
                      className=""
                      src={item.imageUrl}
                      alt={item.name}
                      height={300}
                      width={300}
                    />
                  </div>
                  <div className="flex flex-col px-4 py-2">
                    <p className="font-bold">{item.name}</p>
                    <p>{item.price} €</p>
                    <small>Quantity: {item.quantity}</small>
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
