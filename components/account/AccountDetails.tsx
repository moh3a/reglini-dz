import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { BanIcon } from "@heroicons/react/outline";

import { selectUser } from "../../utils/redux/userSlice";
import { editUsername } from "../../utils/redux/userAsyncActions";
import { DangerDialog, SuccessDialog } from "../elements/Dialog";
import ProfilePicture from "./ProfilePicture";
import Address from "./Address/Address";
import PhoneNumber from "./PhoneNumber";
import RealName from "./RealName";

export default function AccountDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const t = useTranslations("Profile");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [editRealName, setEditRealName] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);

  const [editUsernameForm, setEditUsernameForm] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");

  const emailResendHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post("/api/auth/verifycredentials/resend", {});
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
  };

  const checkName = async () => {
    const { data } = await axios.post("/api/auth/check/name", {
      name: username,
    });
    if (data.success) {
      setValidUsername(true);
      setUsernameMessage("");
    } else {
      setValidUsername(false);
      setUsernameMessage(data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-grim shadow overflow-hidden sm:rounded-lg">
      {success && <SuccessDialog>{success}</SuccessDialog>}
      {error && <DangerDialog>{error}</DangerDialog>}
      <div
        className={`px-4 py-5 sm:px-6 ${
          router.locale === "ar" && "text-right"
        }`}
      >
        <h1
          className={`text-lg leading-6 font-medium text-black dark:text-yellow-200`}
        >
          {t("info")}
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-yellow-100">
          {t("title")}
        </p>
      </div>
      <div className="border-t border-b border-black dark:border-yellow-200 bg-gray-100 dark:bg-grim text-black dark:text-yellow-100">
        <dl>
          <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
            <dt className="text-sm font-medium ">{t("pp")}</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              <ProfilePicture size="lg" />
            </dd>
          </div>
          <div className="border-t border-white dark:border-black  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">{t("username")}</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <p>{user.name}</p>
              <div
                className="cursor-pointer text-orange-700"
                onClick={() => setEditUsernameForm(true)}
              >
                {t("edit")}
              </div>
              {editUsernameForm && (
                <div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="rounded-full py-1 px-3 my-1 w-full border-yellow-200 text-black dark:text-yellow-100 dark:bg-black focus:border-yellow-200 focus:ring-yellow-200"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onBlur={() => checkName()}
                    />
                  </div>
                  {usernameMessage && (
                    <div className="text-red-500">
                      <span>
                        <BanIcon
                          className="h-5 w-5 inline"
                          aria-hidden="true"
                        />{" "}
                        <span className="relative top-1">
                          {usernameMessage}
                        </span>
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => setEditUsernameForm(false)}
                    className="m-1 py-1 px-3 rounded-lg bg-red-400  text-white  hover:bg-red-500 "
                  >
                    {t("cancel")}
                  </button>
                  <button
                    onClick={() => {
                      if (validUsername) {
                        dispatch(editUsername({ username }));
                        setEditUsernameForm(false);
                      }
                    }}
                    className="m-1 py-1 px-3 rounded-lg bg-green-400 text-white  hover:bg-green-500"
                  >
                    {t("save")}
                  </button>
                </div>
              )}
            </dd>
          </div>
          <div className="border-t border-white dark:border-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">{t("email")}</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              {user.email}
            </dd>
          </div>
          {user.account !== "oauth" && (
            <div className="border-t border-white dark:border-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium ">{t("verification")}</dt>
              <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">
                {user.verified ? (
                  <>{t("true")}</>
                ) : (
                  <ul
                    role="list"
                    className="border border-red-500 text-red-500 rounded-md divide-y divide-gray-200"
                  >
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">
                          {t("verify")}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          onClick={emailResendHandler}
                          className="font-medium text-gray-600 hover:text-gray-500"
                        >
                          {t("resend")}
                        </button>
                      </div>
                    </li>
                  </ul>
                )}
              </dd>
            </div>
          )}

          <div className="border-t border-white dark:border-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">{t("name")}</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              <div>{user.realName}</div>
              <button
                onClick={() =>
                  editRealName ? setEditRealName(false) : setEditRealName(true)
                }
              >
                {editRealName ? (
                  <p className="text-red-600">{t("close")}</p>
                ) : (
                  <p className="text-yellow-700">{t("edit")}</p>
                )}
              </button>
              {editRealName ? (
                <div
                  role="list"
                  className="mt-4 px-4 py-5 border border-red-500 rounded-md divide-y divide-gray-200"
                >
                  <RealName />
                </div>
              ) : (
                ""
              )}
            </dd>
          </div>

          <div className="border-t border-white dark:border-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">{t("address")}</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              <div>
                {user.address ? user.address.text : <>{t("placeholder")}</>}
              </div>
              <button
                onClick={() =>
                  editAddress ? setEditAddress(false) : setEditAddress(true)
                }
              >
                {editAddress ? (
                  <p className="text-red-600">{t("close")}</p>
                ) : (
                  <p className="text-yellow-700">{t("edit")}</p>
                )}
              </button>
              {editAddress ? (
                <div
                  role="list"
                  className="mt-4 px-4 py-5 border border-red-500 rounded-md divide-y divide-gray-200"
                >
                  <Address />
                </div>
              ) : (
                ""
              )}
            </dd>
          </div>
          <div className="border-t border-white dark:border-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">{t("phoneNumber")}</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              <div>
                {user.phoneNumber ? (
                  user.phoneNumber
                ) : (
                  <>{t("noPhoneNumber")}</>
                )}
              </div>
              <button
                onClick={() =>
                  editPhoneNumber
                    ? setEditPhoneNumber(false)
                    : setEditPhoneNumber(true)
                }
              >
                {editPhoneNumber ? (
                  <p className="text-red-600">{t("close")}</p>
                ) : (
                  <p className="text-yellow-700">{t("edit")}</p>
                )}
              </button>
              {editPhoneNumber ? (
                <div
                  role="list"
                  className="mt-4 px-4 py-5 border border-red-500 rounded-md divide-y divide-gray-200"
                >
                  <PhoneNumber />
                </div>
              ) : (
                ""
              )}
            </dd>
          </div>
          <div className="border-t border-white dark:border-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">{t("role")}</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">{user.role}</dd>
          </div>
          <div className="border-t border-white dark:border-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">{t("authenticated")}</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              {user.account === "oauth"
                ? `Authentication credentials are provided by ${user.provider}'s oauth provider.`
                : t("credentials")}
            </dd>
          </div>
          <div className="border-t border-white dark:border-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium ">{t("deleteAccount")}</dt>
            <dd className="mt-1 text-sm text-red-500 sm:mt-0 sm:col-span-2">
              <ul
                role="list"
                className="border border-red-500 rounded-md divide-y divide-gray-200"
              >
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    {t("danger")}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Link href="/account/delete" passHref>
                      <a className="font-medium text-red-600 hover:text-red-500">
                        {t("delete")}
                      </a>
                    </Link>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
