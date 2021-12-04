import { useState, useEffect } from "react";
import axios from "axios";
import { DangerDialog, SuccessDialog } from "./../elements/Dialog";

const RealName = ({ user }: any) => {
  const [showForm, setShowForm] = useState(false);
  const [realName, setRealName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user.realName) {
      setShowForm(false);
    }
  }, [user]);

  const realNameSaveHandler = async (e: any) => {
    e.preventDefault();
    if (realName) {
      const { data } = await axios.post("/api/users/realname", {
        realName,
      });
      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      } else {
        setError(data.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
      setShowForm(false);
    }
  };

  return (
    <>
      {success && <SuccessDialog>{success}</SuccessDialog>}
      {error && <DangerDialog>{error}</DangerDialog>}
      {!showForm && user && user.realName ? (
        <div>
          This is your registered full legal name: {user.realName}
          <div
            className="underline cursor-pointer text-gray-600 dark:text-gray-200"
            onClick={() => setShowForm(true)}
          >
            Edit
          </div>
        </div>
      ) : (
        <form onSubmit={realNameSaveHandler}>
          <div className="relative w-full">
            <label>Real full legal name</label>
            <input
              type="text"
              className="rounded-full py-1 px-3 my-1 w-full border-yellow-200 text-black dark:text-yellow-100 dark:bg-black focus:border-yellow-200 focus:ring-yellow-200"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowForm(false)}
            className="m-1 py-1 px-3 rounded-lg bg-red-400  text-white  hover:bg-red-500 "
          >
            Cancel
          </button>
          <button
            type="submit"
            className="m-1 py-1 px-3 rounded-lg bg-green-400 text-white  hover:bg-green-500"
          >
            Save Legal Name
          </button>
        </form>
      )}
    </>
  );
};

export default RealName;
