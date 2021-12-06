import { useState, useEffect, useCallback } from "react";
import { RadioGroup } from "@headlessui/react";
import axios from "axios";

import AlertMessage from "../elements/AlertMessage";

const AdminCurrency = () => {
  let date = new Date().toISOString().substring(0, 10);
  const [currency, setCurrency] = useState("DZDEUR");
  const [parallelPurchase, setParallelPurchase] = useState(0);
  const [parallelSale, setParallelSale] = useState(0);
  const [officialRate, setOfficialRate] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const getCurrency = useCallback(async () => {
    const { data } = await axios.get("/api/currency");
    if (data.success) {
      if (data.data[0].live.time === date) {
        setDone(true);
      } else {
        setDone(false);
      }
      setParallelSale(data.data[0].live.parallel.sale);
      setParallelPurchase(data.data[0].live.parallel.purchase);
      setOfficialRate(data.data[0].live.official.sale);
    } else {
      setError(data.message);
      setTimeout(() => setError(""), 3000);
    }
  }, [date]);

  useEffect(() => {
    getCurrency();
  }, [getCurrency]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    let live = {
      time: date,
      official: {
        sale: officialRate,
      },
      parallel: {
        sale: parallelSale,
        purchase: parallelPurchase,
      },
    };
    if (currency && parallelPurchase && parallelSale && officialRate && date) {
      const { data } = await axios.post("/api/currency", {
        exchange: currency,
        live,
      });
      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message);
        setTimeout(() => setError(""), 3000);
      }
    } else {
      setError("You should fill all fields.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="my-2">
      {error && <AlertMessage type="error" message={error} />}
      {success && <AlertMessage type="success" message={success} />}
      <h1 className="text-xl font-semibold mb-1">Currency Rates</h1>
      {done ? (
        <p className="font-bold text-green-600">Task already done.</p>
      ) : (
        <>
          <p className="font-bold text-red-600">
            You should add daily currecny rates for this date {date}{" "}
          </p>
          <form className="flex flex-col" onSubmit={submitHandler}>
            <RadioGroup
              value={currency}
              onChange={setCurrency}
              className="flex my-2"
            >
              <RadioGroup.Label>Currency: </RadioGroup.Label>
              <RadioGroup.Option value="DZDEUR">
                {({ checked }) => (
                  <span
                    className={`mx-1 border-2 rounded-md p-1 ${
                      checked
                        ? "border-red-300 bg-red-200 dark:bg-red-500"
                        : "border-gray-200 bg-gray-200 dark:bg-gray-500"
                    }`}
                  >
                    DZD / EUR
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="DZDUSD">
                {({ checked }) => (
                  <span
                    className={`mx-1 border-2 rounded-md p-1 ${
                      checked
                        ? "border-red-300 bg-red-200 dark:bg-red-500"
                        : "border-gray-200 bg-gray-200 dark:bg-gray-500"
                    }`}
                  >
                    DZD / USD
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="DZDGBP">
                {({ checked }) => (
                  <span
                    className={`mx-1 border-2 rounded-md p-1 ${
                      checked
                        ? "border-red-300 bg-red-200 dark:bg-red-500"
                        : "border-gray-200 bg-gray-200 dark:bg-gray-500"
                    }`}
                  >
                    DZD / GBP
                  </span>
                )}
              </RadioGroup.Option>
            </RadioGroup>
            <div>
              <p>{currency} Parallel market</p>
              <div className="flex my-1">
                <label className="flex-1">purchase</label>
                <input
                  className="flex-1 text-center rounded-full text-black"
                  type="number"
                  value={parallelPurchase ? parallelPurchase : 0}
                  onChange={(e) =>
                    setParallelPurchase(parseFloat(e.target.value))
                  }
                />
              </div>
              <div className="flex my-1">
                <label className="flex-1">sale</label>
                <input
                  className="flex-1 text-center rounded-full text-black"
                  type="number"
                  value={parallelSale ? parallelSale : 0}
                  onChange={(e) => setParallelSale(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div>
              <p>{currency} Official market</p>
              <div className="flex my-1">
                <label className="flex-1">sale</label>
                <input
                  className="flex-1 text-center rounded-full text-black"
                  type="number"
                  value={officialRate ? officialRate : 0}
                  onChange={(e) => setOfficialRate(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 border-2 border-green-300 bg-green-200 dark:bg-green-500 rounded-lg p-1"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AdminCurrency;
