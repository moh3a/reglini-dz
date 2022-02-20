/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import {
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/outline";

const FlagEU = () => {
  return (
    <div className="w-6 h-6 inline rounded-full">
      <img src="/flag-eu.png" alt="EU flag" />
    </div>
  );
};

const FlagUK = () => {
  return (
    <div className="w-6 h-6 inline">
      <a
        className="sr-only"
        href="https://icons8.com/icon/t3NE3BsOAQwq/great-britain"
      >
        Great Britain icon by Icons8
      </a>
      <img
        src="https://img.icons8.com/color/48/000000/great-britain-circular.png"
        alt="UK flag"
      />
    </div>
  );
};

const FlagUS = () => {
  return (
    <div className="w-6 h-6 inline">
      <a className="sr-only" href="https://icons8.com/icon/aRiu1GGi6Aoe/usa">
        Usa icon by Icons8
      </a>
      <img
        src="https://img.icons8.com/color/48/000000/usa-circular.png"
        alt="USA flag"
      />
    </div>
  );
};

const LiveRate = ({ currency }: any) => {
  const t = useTranslations("Currency.liveRate");

  return (
    <>
      <div className="py-8 lg:py-16 px-4 flex flex-col items-center border-t-2 border-black dark:border-yellow-200 dark:bg-grim">
        <h1 className="text-center text-xl lg:text-4xl font-bold">
          {t("inMarket")}{" "}
          <span className="underline text-gray-700 dark:text-gray-300">
            {t("parallel")}
          </span>{" "}
          {t("market")}
        </h1>
        <div className="text-xs lg:text-sm">{t("dailyRatesParallel")}</div>
        <h1 className="text-lg lg:text-xl font-semibold underline">
          {t("purchase")}
        </h1>
        <div className="flex flex-wrap flex-center select-none">
          {currency.map((current: any) => {
            return (
              <div key={current.exchange}>
                <div className="shadow-lg rounded-2xl p-4 mx-2 my-4 bg-gray-100 dark:bg-black">
                  <div className="flex items-center">
                    {current.exchange === "DZDUSD" ? (
                      <>
                        <FlagUS />
                        <p className="text-md text-black dark:text-white ml-2">
                          1 $ =
                        </p>
                      </>
                    ) : current.exchange === "DZDEUR" ? (
                      <>
                        <FlagEU />
                        <p className="text-md text-black dark:text-white ml-2">
                          1 € =
                        </p>
                      </>
                    ) : (
                      <>
                        <FlagUK />
                        <p className="text-md text-black dark:text-white ml-2">
                          1 £ =
                        </p>
                      </>
                    )}
                  </div>
                  <small className="text-xs">
                    {t("updated")}: {current.live.updated}{" "}
                  </small>
                  <div className="flex flex-col justify-start">
                    <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
                      {current.live.parallel.purchase}
                      <span className="text-sm">{t("dzd")}</span>
                    </p>
                    {current.live.rate.parallelpurchaserate > 1 ? (
                      <div className="flex items-center text-green-500 text-sm">
                        <ArrowUpIcon className="h-3" />
                        <span>
                          {current.live.rate.parallelpurchaserate}{" "}
                          <span className="text-gray-400">
                            {" "}
                            {t("vsYesterday")}
                          </span>
                        </span>
                      </div>
                    ) : current.live.rate.parallelpurchaserate < 1 ? (
                      <div className="flex items-center text-red-500 text-sm">
                        <ArrowDownIcon className="h-3" />
                        <span>
                          {current.live.rate.parallelpurchaserate}{" "}
                          <span className="text-gray-400">
                            {" "}
                            {t("vsYesterday")}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500 text-sm">
                        <span className="text-gray-400">
                          {t("sameYesterday")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="text-lg lg:text-xl font-semibold underline">
          {t("sale")}
        </h1>
        <div className="flex flex-wrap flex-center select-none">
          {currency.map((current: any) => {
            return (
              <div key={current.exchange}>
                <div className="shadow-lg rounded-2xl p-4 mx-2 my-4 bg-gray-100 dark:bg-black">
                  <div className="flex items-center">
                    {current.exchange === "DZDUSD" ? (
                      <>
                        <FlagUS />
                        <p className="text-md text-black dark:text-white ml-2">
                          1 $ =
                        </p>
                      </>
                    ) : current.exchange === "DZDEUR" ? (
                      <>
                        <FlagEU />
                        <p className="text-md text-black dark:text-white ml-2">
                          1 € =
                        </p>
                      </>
                    ) : (
                      <>
                        <FlagUK />
                        <p className="text-md text-black dark:text-white ml-2">
                          1 £ =
                        </p>
                      </>
                    )}
                  </div>
                  <small className="text-xs">
                    {t("updated")}: {current.live.updated}{" "}
                  </small>

                  <div className="flex flex-col justify-start">
                    <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
                      {current.live.parallel.sale}
                      <span className="text-sm">{t("dzd")}</span>
                    </p>
                    {current.live.rate.parallelsalerate > 1 ? (
                      <div className="flex items-center text-green-500 text-sm">
                        <ArrowUpIcon className="h-3" />
                        <span>
                          {current.live.rate.parallelsalerate}{" "}
                          <span className="text-gray-400">
                            {" "}
                            {t("vsYesterday")}
                          </span>
                        </span>
                      </div>
                    ) : current.live.rate.parallelsalerate < 1 ? (
                      <div className="flex items-center text-red-500 text-sm">
                        <ArrowDownIcon className="h-3" />
                        <span>
                          {current.live.rate.parallelsalerate}{" "}
                          <span className="text-gray-400">
                            {" "}
                            {t("vsYesterday")}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500 text-sm">
                        <span className="text-gray-400">
                          {t("sameYesterday")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="py-8 lg:py-16 px-4 flex flex-col items-center border-t-2 border-b-2 border-black dark:border-yellow-200  dark:bg-grim">
        <h1 className="text-center text-xl lg:text-4xl font-bold">
          {t("inMarket")}{" "}
          <span className="underline text-gray-700 dark:text-gray-300">
            {t("official")}
          </span>{" "}
          {t("market")}
        </h1>
        <div className="text-xs lg:text-sm">{t("dailyRatesOfficial")}</div>
        <div className="grid grid-cols-3 gap-x-3 md:gap-x-6 select-none">
          {currency.map((current: any) => {
            return (
              <div key={current.exchange}>
                {/* <div className="shadow-lg rounded-2xl p-4 mx-2 my-4 bg-gray-100 dark:bg-black"> */}
                <div className="shadow-lg rounded-2xl p-4 bg-gray-100 dark:bg-black">
                  <div className="flex items-center">
                    {current.exchange === "DZDUSD" ? (
                      <>
                        <FlagUS />
                        <p className="text-md text-black dark:text-white ml-2">
                          1 $ =
                        </p>
                      </>
                    ) : current.exchange === "DZDEUR" ? (
                      <>
                        <FlagEU />
                        <p className="text-md text-black dark:text-white ml-2">
                          1 € =
                        </p>
                      </>
                    ) : (
                      <>
                        <FlagUK />
                        <p className="text-md text-black dark:text-white ml-2">
                          1 £ =
                        </p>
                      </>
                    )}
                  </div>
                  <small className="text-xs">
                    {t("updated")}: {current.live.updated}{" "}
                  </small>
                  <div className="flex flex-col justify-start">
                    <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
                      {current.live.official.sale}
                      <span className="text-sm">{t("dzd")}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LiveRate;
