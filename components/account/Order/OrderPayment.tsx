import { useState } from "react";
import SubmitPayment from "./SubmitPayment";

const OrderPayment = () => {
  const [payNow, setPayNow] = useState(false);

  return (
    <div className="flex flex-col">
      <h3>When would you like to setup your payment method?</h3>
      <div className="flex flex-row justify-around">
        <button
          onClick={() => setPayNow(true)}
          className={`border-2 ${
            payNow ? "border-red-400" : "border-gray-200"
          } p-2 mx-2`}
        >
          Now
        </button>
        <button
          onClick={() => setPayNow(false)}
          className={`border-2 ${
            !payNow ? "border-red-400" : "border-gray-200"
          } p-2 mx-2`}
        >
          Later
        </button>
      </div>
      {payNow ? (
        <SubmitPayment />
      ) : (
        <small>
          A payment should be submitted in less than 48 hours or the order will
          be automatically cancelled.
        </small>
      )}
    </div>
  );
};

export default OrderPayment;
