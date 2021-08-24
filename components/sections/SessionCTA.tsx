import Link from "next/link";
import { signOut } from "next-auth/client";

const SessionCTA = ({ session }: any) => {
  return (
    <header className="bg-gray-900 relative">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center py-6 lg:h-64 lg:flex-row">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-100">
              Hey{" "}
              <span className="text-gray-400">
                {session ? session.user?.name : "Guest"}
              </span>
              ,
            </h3>

            <p className="mt-3 text-gray-100">
              {session
                ? "We are hoping you are having a good time with us."
                : "Join us and easily shop from the comfort of your home."}
            </p>
          </div>

          <div className="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">
            {session ? (
              <div
                className="max-w-sm bg-white rounded-lg dark:bg-gray-800"
                onClick={() => signOut()}
              >
                <span className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer">
                  Sign out
                </span>
              </div>
            ) : (
              <div className="max-w-sm bg-white rounded-lg dark:bg-gray-800">
                <Link href="/login" passHref>
                  <span className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer">
                    Sign in
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SessionCTA;
