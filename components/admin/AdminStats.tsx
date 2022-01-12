/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const AdminStats = () => {
  const [finance, setFinance] = useState<any>();
  const [rate, setRate] = useState<any>();

  const fetchUsers = useCallback(async () => {
    const { data } = await axios.get("/api/admin/stats");
    setRate(data.data.rate.live.parallel.purchase);
    setFinance(data.data.finance);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="my-2 p-2">
      <h1 className="text-xl font-semibold mb-1">Feedback stats</h1>
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-around">
        To be continued...
      </div>
      {finance && (
        <>
          <h1 className="text-xl font-semibold mb-1">Money stats</h1>
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-around">
            <>
              <div className="my-1 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 text-center w-44 h-44 rounded-lg shadow-md flex flex-col justify-center items-center">
                <div className="text-xl font-bold ">Revenue DZD</div>
                <div>{finance.ordersMoneySumDinars} DZD</div>
              </div>
              <div className="my-1 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 text-center w-44 h-44 rounded-lg shadow-md flex flex-col justify-center items-center">
                <div className="text-xl font-bold ">Paid in Euros</div>
                <div>{finance.ordersMoneySumEuros} euros</div>
              </div>
              <div className="my-1 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 text-center w-44 h-44 rounded-lg shadow-md flex flex-col justify-center items-center">
                <div className="text-xl font-bold ">Profit DZD</div>
                <div>
                  {Math.round(
                    finance.ordersMoneySumDinars -
                      finance.ordersMoneySumEuros * rate
                  )}{" "}
                  DZD
                </div>
              </div>
            </>
          </div>
          <h1 className="text-xl font-semibold mb-1">Accepted payments</h1>
          <div className="m-1 cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 text-center w-44 h-44 rounded-lg shadow-md flex flex-col justify-center items-center">
            <div className="text-xl font-bold ">Accepted payments</div>
            <div>{finance.acceptedPayments.length} payments</div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminStats;
