import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import BlobBackground from "../BlobBackground";

export default function AliexpressCTA() {
  const t = useTranslations("AliexpressCTA");
  const router = useRouter();

  return (
    // <div className="w-100 aspect-w-16 aspect-h-9 bg-wave-haikei bg-no-repeat bg-center bg-cover">
    <div className="bg-aliexpress-svg bg-pink-50 bg-no-repeat bg-content bg-top dark:bg-grim">
      <div
        className={`max-w-7xl mx-auto py-12 px-4 ${
          router.locale === "ar" ? "text-right lg:flex-row-reverse" : ""
        } sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between`}
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 sm:text-4xl">
          <span className="block">
            {t("onlineShopping")} <br />
            {t("solutionShopping")}
          </span>
          <span className="block text-red-400">{t("startNow")}</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link href="/aliexpress" passHref>
              <span className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-400 hover:bg-red-300 cursor-pointer">
                {t("getStarted")}
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
