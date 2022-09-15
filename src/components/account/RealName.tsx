import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";

import { selectUser } from "../../utils/redux/userSlice";
import { DangerDialog, SuccessDialog } from "./../elements/Dialog";
import { editRealName } from "../../utils/redux/userAsyncActions";

const RealName = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const t = useTranslations("Profile");
  const [showForm, setShowForm] = useState(false);
  const [realName, setRealName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user.realName) {
      setShowForm(false);
    }
  }, [user]);

  const realNameSaveHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (realName) {
      dispatch(editRealName({ realName }));
      setShowForm(false);
    }
  };

  return (
    <>
      {success && <SuccessDialog>{success}</SuccessDialog>}
      {error && <DangerDialog>{error}</DangerDialog>}
      {!showForm && user && user.realName ? (
        <div>
          {t("registered")} {t("name")}: {user.realName}
          <div
            className="underline cursor-pointer text-gray-600 dark:text-gray-200"
            onClick={() => setShowForm(true)}
          >
            {t("edit")}
          </div>
        </div>
      ) : (
        <form onSubmit={realNameSaveHandler}>
          <div className="relative w-full">
            <label>{t("name")}</label>
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
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="m-1 py-1 px-3 rounded-lg bg-green-400 text-white  hover:bg-green-500"
          >
            {t("save")}
          </button>
        </form>
      )}
    </>
  );
};

export default RealName;
