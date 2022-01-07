import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

import { IWilaya } from "../../../data/Wilayas";
import SelectDaira from "./SelectDaira";
import SelectWilaya from "./SelectWilaya";
import SelectCommune from "./SelectCommune";
import SelectPostalCode from "./SelectPostalCode";
import { selectUser } from "../../../utils/redux/userSlice";
import { editAddress } from "../../../utils/redux/userAsyncActions";

const Address = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const t = useTranslations("Profile");
  const [showForm, setShowForm] = useState(false);
  const [wilaya, setWilaya] = useState<IWilaya>();
  const [daira, setDaira] = useState<any>();
  const [commune, setCommune] = useState<any>();
  const [postalCode, setPostalCode] = useState("");
  const [addressLine, setAddressLine] = useState("");

  useEffect(() => {
    if (user && user.address) {
      setShowForm(false);
    }
  }, [user]);

  useEffect(() => {
    if (wilaya && !commune) {
      setPostalCode(wilaya.postalCode);
    } else if (commune) {
      setPostalCode(commune.postalCode);
    }
  }, [wilaya, commune]);

  const convertString = (s: string) => {
    let str = s.toLowerCase();
    str = str.replace(/[öô]/g, "o");
    str = str.replace(/[ç]/g, "c");
    str = str.replace(/[ş]/g, "s");
    str = str.replace(/[ıîï]/g, "i");
    str = str.replace(/[ğ]/g, "g");
    str = str.replace(/[üûù]/g, "u");
    str = str.replace(/[âäà]/g, "a");
    str = str.replace(/[éèêë]/g, "e");
    return str;
  };

  const addressSaveHandler = async (e: any) => {
    e.preventDefault();
    if (wilaya && postalCode && addressLine && commune) {
      dispatch(
        editAddress({ wilaya, daira, postalCode, addressLine, commune })
      );
      setShowForm(false);
    }
  };

  return (
    <>
      {!showForm && user && user.address ? (
        <div>
          {t("registered")} {t("address")} {user.address.text}
          <div
            className="underline cursor-pointer text-gray-600 dark:text-gray-200"
            onClick={() => setShowForm(true)}
          >
            {t("edit")}
          </div>
        </div>
      ) : (
        <form onSubmit={addressSaveHandler}>
          <div className=" w-full">
            <label>{t("country")} </label>
            <input
              value={"Algeria"}
              readOnly
              type="text"
              className="ml-2 rounded-full py-1 px-2 my-1  border-yellow-200 text-black dark:text-yellow-100 dark:bg-black focus:border-yellow-200 focus:ring-yellow-200"
            />
          </div>
          <div className=" w-full">
            <label>Wilaya</label>
            <SelectWilaya setWilaya={setWilaya} />
          </div>
          {wilaya && (
            <div className=" w-full">
              <label>Daira</label>
              <SelectDaira wilaya={wilaya} setDaira={setDaira} />
            </div>
          )}
          {daira && (
            <div className=" w-full">
              <label>Commune</label>
              <SelectCommune daira={daira} setCommune={setCommune} />
            </div>
          )}
          {commune && (
            <div className=" w-full">
              {commune.otherPosts && (
                <SelectPostalCode
                  commune={commune}
                  setPostalCode={setPostalCode}
                />
              )}
              <label>
                {t("yourAddressIn")} {commune.name} :
              </label>
              <input
                type="text"
                className="rounded-full py-1 px-2 my-1 w-full  border-yellow-200 text-black dark:text-yellow-100 dark:bg-black focus:border-yellow-200 focus:ring-yellow-200"
                value={addressLine}
                onChange={(e) => setAddressLine(convertString(e.target.value))}
              />
            </div>
          )}
          {postalCode && (
            <div className=" w-full">
              {t("zipCode")} : {postalCode}
            </div>
          )}
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

export default Address;
