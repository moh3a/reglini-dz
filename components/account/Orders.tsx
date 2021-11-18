import { useState } from "react";
import { useDispatch } from "react-redux";

import { cancelOrder, getAllOrders } from "../../utils/redux/userAsyncActions";

export default function Orders({ user }: any) {
  const [orderId, setOrderId] = useState("");
  const dispatch = useDispatch();
  const cancelOrderHandler = () => {
    dispatch(cancelOrder({ id: orderId }));
  };
  const getAllOrdersHandler = () => {
    dispatch(getAllOrders());
  };
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Your orders
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Orders</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user && user.orders.length > 0 ? (
                <div className="flex flex-col">
                  <div>
                    All orders{" "}
                    <button onClick={getAllOrdersHandler}>GET</button>
                  </div>
                  <div>
                    <label>Order Id</label>
                    <input
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                    />
                    <button onClick={cancelOrderHandler}>Cancel order</button>
                  </div>
                </div>
              ) : (
                <p>No orders made.</p>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
