import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import AlertMessage from "../elements/AlertMessage";

const AdminFinance = () => {
  const [commission, setCommission] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const getCommission = useCallback(async () => {
    const { data } = await axios.get("/api/commission");
    if (data.success) {
      setCommission(data.data.commission);
    } else {
      setError(data.message);
      setTimeout(() => setError(""), 3000);
    }
  }, []);

  useEffect(() => {
    getCommission();
  }, [getCommission]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (commission) {
      const { data } = await axios.post("/api/commission", {
        commission,
      });
      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message);
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  return (
    <div className="my-2">
      {error && <AlertMessage type="error" message={error} />}
      {success && <AlertMessage type="success" message={success} />}
      <h1 className="text-xl font-semibold mb-1">Finance</h1>
      <form className="flex flex-col" onSubmit={submitHandler}>
        <div className="flex my-1">
          <label className="flex-1">Commission rate</label>
          <input
            className="flex-1 text-center rounded-full text-black"
            type="number"
            value={commission}
            onChange={(e) => setCommission(parseFloat(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className="mt-2 border-2 border-green-300 bg-green-200 dark:bg-green-500 rounded-lg p-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminFinance;
