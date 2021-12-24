import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

const CommunityScreen = ({ messages }: any) => {
  return (
    <>
      <Head>
        <title>Community | reglini-dz</title>
        <meta
          name="description"
          content="Welcome to reglini-dz (reglini-dz.com). Checkout the services we provide, from buying from Aliexpress using algerians dinars, to subscribing to Netflix and many more to come."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="select-none flex flex-col justify-center items-center w-full h-screen bg-gray-100 dark:bg-gray-700">
        <div className="ml-6 w-28 h-28">
          <Image
            src="/reglinidz-icon-oval.png"
            alt="reglini-dz logo"
            width={50}
            height={50}
            layout="responsive"
          />
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
CommunityScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default CommunityScreen;
