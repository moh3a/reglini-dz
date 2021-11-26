import { useState } from "react";
import axios from "axios";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import parse from "html-react-parser";

import { generateRandomString } from "../../utils/methods";
import { DangerDialog, SuccessDialog } from "../elements/Dialog";
import ProfilePicture from "../elements/ProfilePicture";
import Address from "./Address/Address";
import PhoneNumber from "./PhoneNumber";

export default function AccountDetails({ user }: any) {
  const [generated, setGenerated] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [editAddress, setEditAddress] = useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);

  const emailResendHandler = async (e: any) => {
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

  const generateAvatar = () => {
    let str = generateRandomString(6);
    let svg = createAvatar(style, {
      seed: str,
    });
    setGenerated(svg);
  };

  const saveAvatar = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.post("/api/users/updatepicture", {
      picture: generated,
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
    setGenerated("");
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {success && <SuccessDialog>{success}</SuccessDialog>}
      {error && <DangerDialog>{error}</DangerDialog>}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Account Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Profile picture
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="py-2 cursor-not-allowed line-through hover:underline">
                Upload a new profile picture
              </div>
              <div className="w-full flex">
                <div
                  className="py-2 h-12 cursor-pointer hover:underline"
                  onClick={generateAvatar}
                >
                  Generate new avatar
                </div>
                {generated && (
                  <>
                    <div className="mx-4 flex flex-col my-1">
                      <button
                        onClick={() => setGenerated("")}
                        className="p-1 my-1 bg-gray-500 text-yellow-100 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={generateAvatar}
                        className="p-1 my-1 bg-gray-500 text-yellow-100 rounded-md"
                      >
                        Change
                      </button>
                      <button
                        className="p-1 my-1 bg-red-500 text-yellow-100 rounded-md"
                        onClick={saveAvatar}
                      >
                        Save
                      </button>
                    </div>
                    <div className="h-40 w-40">{parse(generated)}</div>
                  </>
                )}
              </div>
              <div className="py-2">
                {!generated && <ProfilePicture user={user} size="lg" />}
              </div>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Username</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.name}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.email}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Account verification
            </dt>
            <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">
              {user.verified ? (
                <>True</>
              ) : (
                <ul
                  role="list"
                  className="border border-red-500 text-red-500 rounded-md divide-y divide-gray-200"
                >
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">
                        Your account is yet to be verified. Check your inbox.
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={emailResendHandler}
                        className="font-medium text-gray-600 hover:text-gray-500"
                      >
                        Resend verification email
                      </button>
                    </div>
                  </li>
                </ul>
              )}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div>
                {user.address ? user.address.text : <>Somewhere in Algeria.</>}
              </div>
              <button
                onClick={() =>
                  editAddress ? setEditAddress(false) : setEditAddress(true)
                }
              >
                {editAddress ? (
                  <p className="text-red-600">Close</p>
                ) : (
                  <p className="text-yellow-700">Edit</p>
                )}
              </button>
              {editAddress ? (
                <div
                  role="list"
                  className="mt-4 px-4 py-5 border border-red-500 rounded-md divide-y divide-gray-200"
                >
                  <Address user={user} />
                </div>
              ) : (
                ""
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div>
                {user.phoneNumber ? user.phoneNumber : <>No phone number.</>}
              </div>
              <button
                onClick={() =>
                  editPhoneNumber
                    ? setEditPhoneNumber(false)
                    : setEditPhoneNumber(true)
                }
              >
                {editPhoneNumber ? (
                  <p className="text-red-600">Close</p>
                ) : (
                  <p className="text-yellow-700">Edit</p>
                )}
              </button>
              {editPhoneNumber ? (
                <div
                  role="list"
                  className="mt-4 px-4 py-5 border border-red-500 rounded-md divide-y divide-gray-200"
                >
                  <PhoneNumber user={user} />
                </div>
              ) : (
                ""
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.role}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Authenticated</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.account === "oauth"
                ? `Authentication credentials are provided by ${user.provider}'s oauth provider.`
                : `Account created using user's credentials`}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
