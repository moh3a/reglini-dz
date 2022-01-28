/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import SimulateAdResults from "../../components/meta_ads/SimulateAdResults";

const MetaAdsScreen = () => {
  const [commission, setCommission] = useState<number>();
  const [rate, setRate] = useState<number>();

  const fetchRate = useCallback(async () => {
    const { data } = await axios.post("/api/commission");
    if (data.success) {
      setCommission(data.commission);
      setRate(data.rate);
    }
  }, []);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  const converter = (price: number) => {
    if (rate && commission)
      return Math.ceil((price * rate + price * rate * commission) / 10) * 10;
  };

  return (
    <>
      <Head>
        <title>Ad plans | reglini-dz</title>
        <meta
          name="description"
          content="Welcome to reglini-dz (reglini-dz.com). Checkout the services we provide, from buying from Aliexpress using algerians dinars, to subscribing to Netflix and many more to come."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center w-full bg-gray-100 dark:bg-gray-700">
        <div className="h-28 w-28 lg:h-60 lg:w-60 select-none">
          <img src="/meta-icon.png" alt="meta logo" />
        </div>
        {rate && commission && (
          <>
            <SimulateAdResults
              commission={commission}
              converter={converter}
              rate={rate}
            />
            <div className="mb-20" />
            <div className="w-full flex justify-center items-center">
              <Link href="/meta-ads/access_request" passHref>
                <button className="bg-facebook text-white px-3 py-1 rounded-lg">
                  Start by adding your facebook page
                </button>
              </Link>
            </div>
            <div className="mb-20" />
          </>
        )}
        <div className="mb-20" />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
MetaAdsScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default MetaAdsScreen;