import Address from "./Address/Address";

export default function NewOrder({ user }: any) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Place a new order
        </h3>
      </div>
      <div className="border-t border-gray-200">
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
              {user && user.cart.cartItems.length > 1 ? (
                user.cart.cartItems.map((item: any) => (
                  <dd
                    key={item.productId}
                    className="my-1 text-sm text-gray-900 sm:col-span-2"
                  >
                    {item.name}
                  </dd>
                ))
              ) : (
                <dd>You have no products to order.</dd>
              )}
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
}
