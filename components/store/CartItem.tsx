import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../../utils/redux/userAsyncActions";

const CartItem = ({ item }: any) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateQuantity({ id: item.productId, quantity }));
  }, [quantity, dispatch, item.productId]);

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
              <a href={`/aliexpress/product/${item.productId}`}>{item.name}</a>
            </h3>
            <p className="ml-4">${item.price}</p>
          </div>
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
              onChange={(e) => setQuantity(parseInt(e.target.value))}
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
