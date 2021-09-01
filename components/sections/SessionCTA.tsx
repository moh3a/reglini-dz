import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";
import { useTranslations } from "next-intl";

const SessionCTA = ({ session }: any) => {
  const t = useTranslations("SessionCTA");
  const router = useRouter();

  return (
    <header className="bg-gray-900 relative">
      <div className="container px-6 mx-auto">
        <div
          className={`flex flex-col ${
            router.locale === "ar" ? "text-right lg:flex-row-reverse" : ""
          } items-center py-6 lg:h-64 lg:flex-row`}
        >
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-100">
              {t("hey")}{" "}
              <span className="text-gray-400">
                {session ? session.user?.name : t("guest")}
              </span>
              ,
            </h3>

            <p className="mt-3 text-gray-100">
              {session ? t("enjoyTime") : t("joinUs")}
            </p>
          </div>

          <div
            className={`flex mt-8 lg:w-1/2 ${
              router.locale === "ar" ? "lg:justify-start" : "lg:justify-end"
            }  lg:mt-0`}
          >
            {session ? (
              <div
                className="max-w-sm bg-white rounded-lg dark:bg-gray-800"
                onClick={() => signOut()}
              >
                <span className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer">
                  {t("signOut")}
                </span>
              </div>
            ) : (
              <div className="max-w-sm bg-white rounded-lg dark:bg-gray-800">
                <Link href="/login" passHref>
                  <span className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer">
                    {t("signIn")}
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
