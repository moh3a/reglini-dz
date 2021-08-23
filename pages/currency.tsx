import { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import {
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/outline";

import mongoose from "mongoose";
import dbConnect from "../config/db";
import { convertTime } from "../utils/convertTime";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!mongoose.connection.readyState) {
    await dbConnect();
  }
  const { data } = await axios.get(
    `http://localhost:${process.env.PORT}/api/currency`
  );
  const currency = data.data;
  return {
    props: { currency },
  };
};

const ExchangeRate = ({ currency }: any) => {
  return (
    <>
      <Head>
        <title>Currency exchange in the algerian market | reglini.dz</title>
        <meta
          name="description"
          content="The parallel currency market in Algeria is really expenssive. And can go to over 200% the official rate."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-8 lg:py-16 px-4 flex flex-col items-center bg-gray-300 dark:bg-gray-700">
        <h2 className="text-center text-xl lg:text-4xl font-bold">
          Algerian Dinars (DZD) in the{" "}
          <span className="underline text-gray-700 dark:text-gray-300">
            parallel
          </span>{" "}
          market
        </h2>
        <div className="text-xs lg:text-sm">
          Here we give you the daily prices of the big foreign currencies in the
          algerian parallel market.
        </div>
        <h2 className="text-lg lg:text-xl font-semibold underline">purchase</h2>
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
                    Updated: {convertTime(current.live.date)}{" "}
                  </small>
                  <div className="flex flex-col justify-start">
                    <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
                      {current.live.parallel.purchase}
                      <span className="text-sm">DZD</span>
                    </p>
                    {current.live.rate.parallelpurchaserate > 1 ? (
                      <div className="flex items-center text-green-500 text-sm">
                        <ArrowUpIcon className="h-3" />
                        <span>
                          {current.live.rate.parallelpurchaserate} %{" "}
                          <span className="text-gray-400"> vs yesterday</span>
                        </span>
                      </div>
                    ) : current.live.rate.parallelpurchaserate < 1 ? (
                      <div className="flex items-center text-red-500 text-sm">
                        <ArrowDownIcon className="h-3" />
                        <span>
                          {current.live.rate.parallelpurchaserate} %{" "}
                          <span className="text-gray-400"> vs yesterday</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500 text-sm">
                        <span className="text-gray-400">Same as yesterday</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <h2 className="text-lg lg:text-xl font-semibold underline">sale</h2>
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
                    Updated: {convertTime(current.live.date)}{" "}
                  </small>

                  <div className="flex flex-col justify-start">
                    <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
                      {current.live.parallel.sale}
                      <span className="text-sm">DZD</span>
                    </p>
                    {current.live.rate.parallelsalerate > 1 ? (
                      <div className="flex items-center text-green-500 text-sm">
                        <ArrowUpIcon className="h-3" />
                        <span>
                          {current.live.rate.parallelsalerate} %{" "}
                          <span className="text-gray-400"> vs yesterday</span>
                        </span>
                      </div>
                    ) : current.live.rate.parallelsalerate < 1 ? (
                      <div className="flex items-center text-red-500 text-sm">
                        <ArrowDownIcon className="h-3" />
                        <span>
                          {current.live.rate.parallelsalerate} %{" "}
                          <span className="text-gray-400"> vs yesterday</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500 text-sm">
                        <span className="text-gray-400">Same as yesterday</span>
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
          Algerian Dinars (DZD) in the{" "}
          <span className="underline text-gray-700 dark:text-gray-300">
            official
          </span>{" "}
          market
        </h2>
        <div className="text-xs lg:text-sm">
          Here we give you the daily prices of the big foreign currencies in the
          algerian official market.
        </div>
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
                    Updated: {convertTime(current.live.date)}{" "}
                  </small>
                  <div className="flex flex-col justify-start">
                    <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
                      {current.live.official.sale}
                      <span className="text-sm">DZD</span>
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

import Layout from "../components/layout/Layout";
ExchangeRate.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ExchangeRate;
