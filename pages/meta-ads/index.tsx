/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";

import { selectUser } from "../../utils/redux/userSlice";
import PagesList from "../../components/meta_ads/PagesList";

const MetaAdsScreen = () => {
  const { user } = useSelector(selectUser);

  return (
    <>
      <Head>
        <title>Meta Ads | reglini-dz</title>
        <meta
          name="description"
          content="Welcome to reglini-dz (reglini-dz.com). Checkout the services we provide, from buying from Aliexpress using algerians dinars, to subscribing to Netflix and many more to come."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center">
        <div className="h-28 w-28 lg:h-60 lg:w-60 select-none">
          <img src="/meta-icon.png" alt="meta logo" />
        </div>
        {user ? (
          <div className="w-full">
            <div className="mt-2 mb-8 flex flex-col md:mx-44 text-center md:text-left md:flex-row md:justify-center">
              <div className="text-sm md:mr-3">
                Demand an access request to your Facebook page
              </div>
              <div className="relative mt-2 md:mt-0 bottom-1">
                <Link href="/meta-ads/access_request" passHref>
                  <button className="px-4 py-1 bg-facebook text-white rounded-lg cursor-pointer">
                    Demand
                  </button>
                </Link>
              </div>
            </div>

            <PagesList />
          </div>
        ) : (
          <div className="mb-20 mx-4 md:mx-10 text-center text-2xl font-semibold">
            <h2>You have to be logged in to use this service.</h2>
            <div>
              <Link href="/auth/login" passHref>
                <button className="bg-facebook text-white py-1 px-4 rounded-lg my-4">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
        <div className="mb-20" />
        <div className="w-full text-center">
          <div className="text-2xl font-semibold">
            Discover your business&apos;s potential reach !
          </div>
          <div>
            <i className="fab fa-facebook-square text-facebook p-1"></i>
            <i className="fab fa-instagram text-pink-600 p-1"></i>
          </div>
          <Link href="/meta-ads/simulate" passHref>
            <button className="underline">plan your Meta ad</button>
          </Link>
        </div>
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
