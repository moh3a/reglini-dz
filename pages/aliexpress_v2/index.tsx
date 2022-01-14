import { useState, useEffect, useCallback } from "react";
import Head from "next/head";

import SearchAE from "../../components/aliexpress_v2/SearchAE";
import RecommendedProducts from "../../components/store/RecommendedProducts";

const Aliexpress = () => {
  const [url, setUrl] = useState("");

  const [commission, setCommission] = useState<number>();
  const [rate, setRate] = useState<number>();
  const fetchCommission = useCallback(async () => {
    const { data } = await axios.get(`/api/commission`);
    setCommission(data.data.commission);
  }, []);
  const fetchRate = useCallback(async () => {
    const { data } = await axios.get(`/api/currency`);
    setRate(data.data[0].live.parallel.sale);
  }, []);
  useEffect(() => {
    fetchCommission();
    fetchRate();
  }, [fetchCommission, fetchRate]);

  const converter = (price: number) => {
    if (rate && commission)
      return Math.ceil((price * rate + price * rate * commission) / 10) * 10;
  };

  // const callaeauth = async () => {
  //   const { data } = await axios.post("/api/aliexpress/auth");
  //   if (typeof window !== "undefined") {
  //     window.open(data.data);
  //   }
  // };

  // const aeds = async () => {
  //   const { data } = await axios.post("/api/aliexpress/ds/product/detail");
  //   console.log(data);
  // };

  return (
    <>
      <Head>
        <title>Search Aliexpress items | reglini-dz</title>
        <meta
          name="description"
          content="Buying items from AliExpress and with Algerian Dinars? Now that's possible here in reglini-dz. Safe and reliable algerian online shopping."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchAE url={url} setUrl={setUrl} converter={converter} />
      {/* {user && (!user.aeCredentials || !user.aeCredentials.token) ? (
        <div className="px-5 py-6 flex flex-col justify-center items-center">
          <h2>
            You can connect to your AliExpress account to get custom results
            from AliExpress tailored for you.
          </h2>
          <button
            onClick={callaeauth}
            type="button"
            className="border border-aliexpress bg-aliexpress text-white px-3 py-1"
          >
            Connect to Aliexpress
          </button>
        </div>
      ) : (
        <div className="px-5 py-6 flex flex-col justify-center items-center">
          <h2>Get Recommended Products For Your query</h2>
          <button
            onClick={aeds}
            type="button"
            className="border border-aliexpress bg-aliexpress text-white px-3 py-1"
          >
            Call DropShipping API
          </button>
        </div>
      )} */}
      {}
      <RecommendedProducts />
    </>
  );
};

import axios from "axios";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
Aliexpress.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Aliexpress;
