import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import Logo from "./Logo";
import SelectLanguage from "../elements/SelectLanguage";
import ToggleDark from "../elements/ToggleDark";

const Footer = () => {
  const t = useTranslations("Footer");
  const router = useRouter();

  return (
    <footer className="relative bg-white dark:bg-grim">
      <div className="container px-6 py-4 mx-auto">
        <div
          className={
            router.locale === "ar" ? "lg:flex lg:flex-row-reverse" : `lg:flex`
          }
        >
          <div className="w-full -mx-6 lg:flex-1">
            <div className="px-6 text-center">
              <div>
                <a className="cursor-pointer text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                  reglini-dz
                </a>
              </div>

              <p className=" mt-2 text-gray-500 dark:text-gray-400">
                {t("desc")}
              </p>

              <div className="flex justify-center mt-4 -mx-2">
                <Link href="https://www.facebook.com/reglini.dz" passHref>
                  <a
                    target="_blank"
                    className="mx-2 text-blue-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-gray-400"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </a>
                </Link>

                <a
                  className="mx-2 text-blue-400 dark:text-gray-200 hover:text-blue-300 dark:hover:text-gray-400"
                  aria-label="Messenger"
                >
                  <i className="fab fa-facebook-messenger"></i>
                </a>

                <Link href="https://www.instagram.com/reglini.dz/" passHref>
                  <a
                    target="_blank"
                    className="mx-2 text-pink-600 dark:text-gray-200 hover:text-pink-700 dark:hover:text-gray-400"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 md:ml-16 lg:mt-0 lg:flex-1">
            <div
              className={`grid grid-cols-2 gap-6 sm:grid-cols-3 ${
                router.locale === "ar" ? "text-right" : ""
              }`}
            >
              <div>
                <h3 className="text-gray-900 font-bold uppercase dark:text-white">
                  {t("info")}
                </h3>
                <Link href="/support" passHref>
                  <a className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    {t("support")}
                  </a>
                </Link>
                <Link href="/pp" passHref>
                  <a className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    {t("pp")}
                  </a>
                </Link>
                <Link href="/tos" passHref>
                  <a className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    {t("tos")}
                  </a>
                </Link>
              </div>

              <div>
                <h3 className="text-gray-900 font-bold uppercase dark:text-white">
                  {t("contact")}
                </h3>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                  +213 540 86 17 75
                </span>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                  support@reglini-dz.com
                </span>
              </div>
              <div className="hidden lg:block">
                <div>
                  <SelectLanguage />
                </div>
                <div className="mt-8">
                  <ToggleDark />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-gray-300 border-none dark:bg-gray-700" />

        <div className="w-full flex justify-center">
          <Logo width="50" height="50" loading={false} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
