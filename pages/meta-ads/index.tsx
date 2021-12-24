import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

const MetaAdsScreen = ({ messages }: any) => {
  return (
    <>
      <Head>
        <title>Coming soon | Meta Ads | reglini-dz</title>
        <meta
          name="description"
          content="Welcome to reglini-dz (reglini-dz.com). Checkout the services we provide, from buying from Aliexpress using algerians dinars, to subscribing to Netflix and many more to come."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="select-none flex flex-col justify-center items-center w-full h-screen bg-gray-100 dark:bg-gray-700">
        <div className="flex justify-center">
          <div className="h-28 w-28 lg:h-60 lg:w-60">
            <Image
              src="/meta-icon.png"
              alt="meta logo"
              width={100}
              height={100}
              layout="responsive"
            />
          </div>
          <div className="border-r-2 border-gray-600 dark:border-gray-300 w-1 h-32 lg:h-60" />
          <div className="ml-3 lg:ml-6 h-28 w-28 lg:h-60 lg:w-60 relative top-10 lg:top-16">
            <div className="w-10 h-10 lg:w-28 lg:h-28">
              <Image
                src="/reglinidz-icon-oval.png"
                alt="reglini-dz logo"
                width={50}
                height={50}
                layout="responsive"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 text-4xl font-bold">Coming soon!</div>
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
