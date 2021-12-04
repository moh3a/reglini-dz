import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export default function AliexpressCTA() {
  const t = useTranslations("AliexpressCTA");
  const router = useRouter();

  return (
    // <div className="w-100 aspect-w-16 aspect-h-9 bg-wave-haikei bg-no-repeat bg-center bg-cover">
    <div className="flex items-center bg-aliexpress-svg h-[calc(100vh-6rem)] md:h-[calc(100vh-5rem)] bg-pink-50 bg-no-repeat bg-content bg-top dark:bg-grim">
      <div
        className={`max-w-7xl mx-auto py-12 px-4 ${
          router.locale === "ar" ? "text-right lg:flex-row-reverse" : ""
        } sm:px-6 lg:py-16 lg:px-8`}
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 sm:text-4xl">
          <span className="block">
            {t("onlineShopping")} <br />
            {t("solutionShopping")}
          </span>
          <span className="block text-red-400">{t("startNow")}</span>
        </h2>
        <div className="flex lg:mt-0 lg:flex-shrink-0">
          <div className="mx-1 mt-16 inline-flex rounded-md shadow">
            <Link href="/aliexpress" passHref>
              <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-400 hover:bg-red-300">
                {t("getStarted")}
              </a>
            </Link>
          </div>
          <div className="mx-1 mt-16 inline-flex rounded-md shadow">
            <Link href="/faq#howitworks" passHref>
              <a className=" inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600">
                Learn More
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
