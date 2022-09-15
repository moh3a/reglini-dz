/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/solid";

const AdminStats = () => {
  const [finance, setFinance] = useState<any>();
  const [rate, setRate] = useState<any>();
  const [feedback, setFeedback] = useState<any>();

  const fetchUsers = useCallback(async () => {
    const { data } = await axios.get("/api/admin/stats");
    console.log(data);
    setFeedback(data.data.feedback);
    setRate(data.data.rate.live.parallel.purchase);
    setFinance(data.data.finance);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="my-2 p-2">
      {feedback && (
        <div className="my-4">
          <h1 className="text-xl font-semibold mb-1">Feedback stats</h1>
          <p>
            <span className="text-gray-600 dark:text-gray-400">
              Average service rating
            </span>{" "}
            <span className="text-yellow-400">
              <StarIcon className="h-6 w-6 mr-1 inline" aria-hidden="true" />
              {feedback.averageRate}
            </span>
          </p>
          <p>
            <span className="text-gray-600 dark:text-gray-400">
              Feedback count:
            </span>{" "}
            {feedback.feedbackCount}
          </p>
        </div>
      )}

      {finance && (
        <div className="my-4">
          <h1 className="text-xl font-semibold mb-1">Money stats</h1>
          <p>
            <span className="text-gray-600 dark:text-gray-400">
              Revenue DZD:
            </span>{" "}
            {finance.ordersMoneySumDinars} DZD
          </p>
          <p>
            <span className="text-gray-600 dark:text-gray-400">
              Paid in Euros:
            </span>{" "}
            {finance.ordersMoneySumEuros} euros
          </p>
          <p>
            <span className="text-gray-600 dark:text-gray-400">
              Profit DZD:
            </span>{" "}
            {Math.round(
              finance.ordersMoneySumDinars - finance.ordersMoneySumEuros * rate
            )}{" "}
            DZD
          </p>
          <p>
            <span className="text-gray-600 dark:text-gray-400">
              Number of accepted payments:
            </span>{" "}
            {finance.acceptedPayments.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminStats;
