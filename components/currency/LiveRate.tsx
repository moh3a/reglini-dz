import { useTranslations } from "next-intl";
import {
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/outline";
import { convertTime } from "../../utils/methods";

const LiveRate = ({ currency }: any) => {
  const t = useTranslations("Currency.liveRate");

  return (
    <>
      <div className="py-8 lg:py-16 px-4 flex flex-col items-center bg-gray-300 dark:bg-gray-700">
        <h2 className="text-center text-xl lg:text-4xl font-bold">
          {t("inMarket")}{" "}
          <span className="underline text-gray-700 dark:text-gray-300">
            {t("parallel")}
          </span>{" "}
          {t("market")}
        </h2>
        <div className="text-xs lg:text-sm">{t("dailyRatesParallel")}</div>
        <h2 className="text-lg lg:text-xl font-semibold underline">
          {t("purchase")}
        </h2>
        <div className="flex flex-wrap flex-center select-none">
          {currency.map((current: any) => {
            return (
              <div key={current.exchange}>
                <div className="shadow-lg rounded-2xl p-4 mx-2 my-4 bg-white dark:bg-gray-800">
                  <div className="flex items-center">
                    {current.exchange === "DZDUSD" ? (
                      <>
                        <span className="rounded-xl relative p-4">
                          <CurrencyDollarIcon className="text-gray-500 dark:text-gray-200 h-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </span>
                        <p className="text-md text-black dark:text-white ml-2">
                          1 USD =
                        </p>
                      </>
                    ) : current.exchange === "DZDEUR" ? (
                      <>
                        <span className="rounded-xl relative p-4">
                          <CurrencyEuroIcon className="text-gray-500 dark:text-gray-200 h-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </span>
                        <p className="text-md text-black dark:text-white ml-2">
                          1 EUR =
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="rounded-xl relative p-4">
                          <CurrencyPoundIcon className="text-gray-500 dark:text-gray-200 h-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </span>
                        <p className="text-md text-black dark:text-white ml-2">
                          1 GBP =
                        </p>
                      </>
                    )}
                  </div>
                  <small className="text-xs">
                    {t("updated")}: {convertTime(current.live.time)}{" "}
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
        <h2 className="text-lg lg:text-xl font-semibold underline">
          {t("sale")}
        </h2>
        <div className="flex flex-wrap flex-center select-none">
          {currency.map((current: any) => {
            return (
              <div key={current.exchange}>
                <div className="shadow-lg rounded-2xl p-4 mx-2 my-4 bg-white dark:bg-gray-800">
                  <div className="flex items-center">
                    {current.exchange === "DZDUSD" ? (
                      <>
                        <span className="rounded-xl relative p-4">
                          <CurrencyDollarIcon className="text-gray-500 dark:text-gray-200 h-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </span>
                        <p className="text-md text-black dark:text-white ml-2">
                          1 USD =
                        </p>
                      </>
                    ) : current.exchange === "DZDEUR" ? (
                      <>
                        <span className="rounded-xl relative p-4">
                          <CurrencyEuroIcon className="text-gray-500 dark:text-gray-200 h-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </span>
                        <p className="text-md text-black dark:text-white ml-2">
                          1 EUR =
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="rounded-xl relative p-4">
                          <CurrencyPoundIcon className="text-gray-500 dark:text-gray-200 h-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </span>
                        <p className="text-md text-black dark:text-white ml-2">
                          1 GBP =
                        </p>
                      </>
                    )}
                  </div>
                  <small className="text-xs">
                    {t("updated")}: {convertTime(current.live.time)}{" "}
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
      <div className="py-8 lg:py-16 px-4 flex flex-col items-center bg-gray-200 dark:bg-gray-900">
        <h2 className="text-center text-xl lg:text-4xl font-bold">
          {t("inMarket")}{" "}
          <span className="underline text-gray-700 dark:text-gray-300">
            {t("official")}
          </span>{" "}
          {t("market")}
        </h2>
        <div className="text-xs lg:text-sm">{t("dailyRatesOfficial")}</div>
        <div className="flex flex-wrap flex-center select-none">
          {currency.map((current: any) => {
            return (
              <div key={current.exchange}>
                <div className="shadow-lg rounded-2xl p-4 mx-2 my-4 bg-white dark:bg-gray-800">
                  <div className="flex items-center">
                    {current.exchange === "DZDUSD" ? (
                      <>
                        <span className="rounded-xl relative p-4">
                          <CurrencyDollarIcon className="text-gray-500 dark:text-gray-200 h-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </span>
                        <p className="text-md text-black dark:text-white ml-2">
                          1 USD =
                        </p>
                      </>
                    ) : current.exchange === "DZDEUR" ? (
                      <>
                        <span className="rounded-xl relative p-4">
                          <CurrencyEuroIcon className="text-gray-500 dark:text-gray-200 h-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </span>
                        <p className="text-md text-black dark:text-white ml-2">
                          1 EUR =
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="rounded-xl relative p-4">
                          <CurrencyPoundIcon className="text-gray-500 dark:text-gray-200 h-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </span>
                        <p className="text-md text-black dark:text-white ml-2">
                          1 GBP =
                        </p>
                      </>
                    )}
                  </div>
                  <small className="text-xs">
                    {t("updated")}: {convertTime(current.live.time)}{" "}
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
