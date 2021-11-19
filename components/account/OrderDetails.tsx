import { useDispatch } from "react-redux";
import { getOrderDetails } from "../../utils/redux/userAsyncActions";

export default function OrderDetails({ user }: any) {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(getOrderDetails({ id: "" }));
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Your orders
        </h3>
      </div>
      <div className="border-t border-gray-200">Hello</div>
    </div>
  );
}
