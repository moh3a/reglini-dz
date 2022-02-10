import { GetStaticProps } from "next";
import Head from "next/head";

import AllBlogs from "../../components/community/AllBlogs";

const CommunityScreen = () => {
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
      <AllBlogs />
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
