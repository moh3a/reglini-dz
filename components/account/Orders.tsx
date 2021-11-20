import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  cancelOrder,
  getOrderDetails,
} from "../../utils/redux/userAsyncActions";

export default function Orders({ user }: any) {
  const dispatch = useDispatch();
  const router = useRouter();

  const viewDetailsHandler = (id: any) => {
    dispatch(getOrderDetails({ id }));
    router.push(`/account/orders/${id}`);
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
                user.orders.map((order: any) => (
                  <div key={order.orderId} className="flex flex-col">
                    <div>
                      <p>Order ID : {order.orderId} </p>
                      <p>Products : </p>
                      <ul>
                        <li>
                          <p>ProductID: {order.product.productId}</p>{" "}
                          {order.status ? <p>Status: {order.status}</p> : ""}
                        </li>
                      </ul>
                    </div>
                    <button onClick={() => viewDetailsHandler(order.orderId)}>
                      View details
                    </button>
                    <button
                      onClick={() =>
                        dispatch(cancelOrder({ id: order.orderId }))
                      }
                    >
                      Cancel order
                    </button>
                  </div>
                ))
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
