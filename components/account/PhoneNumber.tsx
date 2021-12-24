import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../utils/redux/userSlice";
import { useTranslations } from "next-intl";
import { DangerDialog, SuccessDialog } from "./../elements/Dialog";

const PhoneNumber = () => {
  const { user } = useSelector(selectUser);
  const t = useTranslations("Profile");
  const [showForm, setShowForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user.phoneNumber) {
      setShowForm(false);
    }
  }, [user]);

  const phoneNumberSaveHandler = async (e: any) => {
    e.preventDefault();
    if (phoneNumber) {
      let phone = phoneNumber.replace(/[-a-zA-Z!@#$%^&* ]/g, "");
      if (phone[0] === "0") {
        phone = phone.slice(1);
      }
      phone = "+213" + phone;
      const { data } = await axios.post("/api/user/details/phonenumber", {
        phoneNumber: phone,
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
      {!showForm && user && user.phoneNumber ? (
        <div>
          {t("registered")} {t("phoneNumber")} {user.phoneNumber}
          <div
            className="underline cursor-pointer text-gray-600 dark:text-gray-200"
            onClick={() => setShowForm(true)}
          >
            {t("edit")}
          </div>
        </div>
      ) : (
        <form onSubmit={phoneNumberSaveHandler}>
          <div className="relative w-full">
            <label>{t("phoneNumber")}</label>
            <input
              type="number"
              className="relative rounded-full py-1 pl-12 pr-3 my-1 w-full border-yellow-200 text-black dark:text-yellow-100 dark:bg-black focus:border-yellow-200 focus:ring-yellow-200"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <span className="absolute inset-y-0 left-2 top-8">+213</span>
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

export default PhoneNumber;
