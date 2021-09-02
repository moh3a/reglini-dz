import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { DangerDialog, SuccessDialog } from "../elements/Dialog";

export default function AccountDetails({ user }: any) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
              <div className="py-2 cursor-pointer">
                Upload a new profile picture
              </div>
              <div className="py-2">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={user.imageUrl || "/user-icon.png"}
                  alt={user.name || "user profile image"}
                  height={80}
                  width={80}
                />
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
              Somewhere in Algeria.
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
