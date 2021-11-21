import OrderDetails from "./OrderDetails";

export default function Orders({ user }: any) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <h3 className="px-4 py-5 sm:px-6 text-lg leading-6 font-medium text-gray-900">
        Your orders
      </h3>

      <div className="m-2 py-4 px-2">
        {user && user.orders.length > 0 ? (
          user.orders.map((order: any) => (
            <OrderDetails order={order} key={order.orderId} />
          ))
        ) : (
          <p>No orders made.</p>
        )}
      </div>
    </div>
  );
}
