import { useDispatch } from "react-redux";
import { getOrderTracking } from "../../utils/redux/userAsyncActions";

export default function OrderDetails({ user, id }: any) {
  const dispatch = useDispatch();

  const getTrackingHandler = () => {
    dispatch(getOrderTracking({ id }));
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          You order
        </h3>
      </div>
      <button
        onClick={getTrackingHandler}
        className="px-3 py-1 border border-gray-200"
      >
        Tracking
      </button>
    </div>
  );
}
