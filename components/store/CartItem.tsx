import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../utils/redux/userAsyncActions";

const CartItem = ({ item }: any) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const quantityHandler = (e: any) => {
    setQuantity(parseInt(e.target.value));
    dispatch(
      updateQuantity({ id: item.productId, quantity: parseInt(e.target.value) })
    );
  };

  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <Image
          src={item.imageUrl ? item.imageUrl : "/placeholder.png"}
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
              <Link href={`/aliexpress/product/${item.productId}`}>
                <a target="_blank">{item.name}</a>
              </Link>
            </h3>
            <p className="ml-4">€{item.price}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-between text-xs  my-2">
          {item.properties.map((property: any) => (
            <div key={property.id} className="hover:underline">
              {property.name} :
              <span className="font-bold text-gray-500">
                {" "}
                {property.value.name}
              </span>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-700 my-2">
          Shipping carrier: <span className="font-bold">{item.carrierId}</span>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <p className="text-gray-600 dark:text-gray-200">
            Qty{" "}
            <input
              type="number"
              min="1"
              onKeyDown={(e) => e.preventDefault()}
              step="1"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={quantityHandler}
              className="p-1 mr-4 text-center w-20 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </p>

          <div className="flex">
            <button
              onClick={() =>
                dispatch(
                  removeFromCart({
                    id: item.productId,
                  })
                )
              }
              type="button"
              className="font-medium text-red-600 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CartItem;
