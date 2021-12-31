import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { IWilaya } from "../../../data/Wilayas";
import SelectDaira from "./SelectDaira";
import SelectWilaya from "./SelectWilaya";
import SelectCommune from "./SelectCommune";
import { DangerDialog, SuccessDialog } from "../../elements/Dialog";
import SelectPostalCode from "./SelectPostalCode";

const Address = ({ user }: any) => {
  const t = useTranslations("Profile");
  const [showForm, setShowForm] = useState(false);
  const [wilaya, setWilaya] = useState<IWilaya>();
  const [daira, setDaira] = useState<any>();
  const [commune, setCommune] = useState<any>();
  const [postalCode, setPostalCode] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user.address) {
      setShowForm(false);
    }
  }, [user]);

  useEffect(() => {
    if (wilaya && !commune) {
      setPostalCode(wilaya.postalCode);
    } else if (commune /*&& !commune.otherPosts*/) {
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
      let address =
        addressLine +
        ", " +
        commune.name +
        ", wilaya " +
        wilaya.name +
        " " +
        postalCode;
      const { data } = await axios.post("/api/user/details/address", {
        text: address,
        postalCode,
        wilaya: wilaya.name,
        daira: daira.name,
        commune: commune.name,
        streetName: addressLine,
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
          {wilaya &&
          wilaya.id !== 23 &&
          wilaya.id !== 24 &&
          wilaya.id !== 25 &&
          wilaya.id !== 26 &&
          wilaya.id !== 27 &&
          wilaya.id !== 28 &&
          wilaya.id !== 29 &&
          wilaya.id !== 30 &&
          wilaya.id !== 31 &&
          wilaya.id !== 32 &&
          wilaya.id !== 33 &&
          wilaya.id !== 34 &&
          wilaya.id !== 35 &&
          wilaya.id !== 36 &&
          wilaya.id !== 37 &&
          wilaya.id !== 38 &&
          wilaya.id !== 39 &&
          wilaya.id !== 40 &&
          wilaya.id !== 41 &&
          wilaya.id !== 42 &&
          wilaya.id !== 43 &&
          wilaya.id !== 44 &&
          wilaya.id !== 46 &&
          wilaya.id !== 47 &&
          wilaya.id !== 48 ? (
            <div className=" w-full">
              <label>Daira</label>
              <SelectDaira wilaya={wilaya} setDaira={setDaira} />
            </div>
          ) : (
            <div className=" w-full text-red-500 font-semibold">
              {t("willBeAvailableSoon")}
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
