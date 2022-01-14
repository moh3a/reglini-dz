import { GetStaticProps } from "next";
import Head from "next/head";
import { useSession } from "next-auth/client";

import { IUser } from "../utils/types";
import SessionCTA from "../components/sections/SessionCTA";
import AliexpressCTA from "../components/sections/AliexpressCTA";
import AppCTA from "../components/sections/AppCTA";
import RecommendedProducts from "../components/store/RecommendedProducts";

const HomeScreen = () => {
  const [session, loading]: [IUser | null, boolean] = useSession();

  return (
    <>
      <Head>
        <title>reglini-dz</title>
        <meta
          name="description"
          content="Welcome to reglini-dz (reglini-dz.com). Checkout the services we provide, from buying from Aliexpress using algerians dinars, to subscribing to Netflix and many more to come."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AliexpressCTA />
      <RecommendedProducts />
      <SessionCTA session={session} />
      <AppCTA />
    </>
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
};

import Layout from "../components/layout/Layout";
HomeScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default HomeScreen;
