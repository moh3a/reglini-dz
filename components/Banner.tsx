import Link from "next/link";
import { SpeakerphoneIcon, XCircleIcon, XIcon } from "@heroicons/react/outline";

export default function Banner({ type, children }: any) {
  return (
    <div className={type === "error" ? "bg-red-600" : "bg-indigo-600"}>
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span
              className={`flex p-2 rounded-lg ${
                type === "error" ? "bg-red-700" : "bg-indigo-800"
              }`}
            >
              {type === "error" ? (
                <XCircleIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              ) : (
                <SpeakerphoneIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              )}
            </span>
            <p className="ml-3 font-medium text-white truncate">
              {/* <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">
                Big news! We&apos;re excited to announce a brand new product.
              </span> */}
              {children}
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link href="/login" passHref>
              <span
                className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer bg-white ${
                  type === "error"
                    ? "text-red-600 hover:bg-red-50"
                    : "text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                Go back!
              </span>
            </Link>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className={`-mr-1 flex p-2 rounded-md ${
                type === "error" ? "hover:bg-red-500" : "hover:bg-indigo-500"
              } focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2`}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
