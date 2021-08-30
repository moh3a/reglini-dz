import Link from "next/link";
import BlobBackground from "../BlobBackground";

export default function AliexpressCTA() {
  return (
    // <div className="w-100 aspect-w-16 aspect-h-9 bg-wave-haikei bg-no-repeat bg-center bg-cover">
    <div className="bg-aliexpress-svg bg-pink-50 bg-no-repeat bg-content bg-top dark:bg-grim">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 sm:text-4xl">
          <span className="block">
            International online shopping is complicated in Algeria, right?{" "}
            <br />
            You can now buy with DZD.
          </span>
          <span className="block text-red-400">
            Start buying from Aliexpress right now.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link href="/aliexpress" passHref>
              <span className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-400 hover:bg-red-300 cursor-pointer">
                Get started
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    // <BlobBackground>Hello</BlobBackground>
    // </div>
  );
}
