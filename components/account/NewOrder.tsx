import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  createOrder,
  removeFromCart,
} from "../../utils/redux/userAsyncActions";
import Address from "./Address/Address";
import PhoneNumber from "./PhoneNumber";

export default function NewOrder({ user, products }: any) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    let p: any[] = [];
    products.map((item: any) => {
      p.push({
        productId: item.productId,
        sku: item.sku,
        quantity: item.quantity,
        carrierId: item.shipping,
        orderMemo:
          "Please do not put invoices or any other document inside the package. Instead send them to this email address support@reglini-dz.com. Thank you very much.",
      });
    });
    let shippingAddress = {
      name,
      phoneCountry: "+213",
      mobilePhone: user.phoneNumber.replace("+213", "0"),
      addressLine1: user.address.streetName,
      city: user.address.commune,
      province: user.address.wilaya,
      countryCode: "DZ",
      zipCode: user.address.postalCode,
    };
    dispatch(createOrder({ products: p, shippingAddress }));
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className=" rounded-full py-1 px-2 my-1 w-full"
              />
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
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm h-full font-medium text-gray-500">
              Products
            </dt>
            <div>
              {products.map((item: any) => (
                <dd
                  key={item.productId}
                  className="my-1 text-sm text-gray-900 sm:col-span-2"
                >
                  {item.name}
                </dd>
              ))}
            </div>
          </div>
        </dl>
      </div>
      <div className="w-full flex justify-end my-3">
        {name &&
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
              {name ? "" : <li>Add your real identity name.</li>}
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
