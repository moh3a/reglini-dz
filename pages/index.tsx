import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useSession } from "next-auth/client";

import { IUser } from "../utils/types";
import { selectUser } from "../utils/redux/userSlice";
import { getUser } from "../utils/redux/userAsyncActions";
import SessionCTA from "../components/sections/SessionCTA";
import AliexpressCTA from "../components/sections/AliexpressCTA";
import AppCTA from "../components/sections/AppCTA";

const HomeScreen = ({ messages }: any) => {
  const dispatch = useDispatch();
  const [session, loading]: [IUser | null, boolean] = useSession();
  const { isAuthenticated, status } = useSelector(selectUser);

  // useEffect(() => {
  //   if (!isAuthenticated && session && status !== "loading") {
  //     const email = session.user?.email;
  //     const type = session.user?.type;
  //     const provider = session.user?.provider || undefined;
  //     dispatch(getUser({ email, account: type, provider }));
  //   }
  // }, [session, dispatch, isAuthenticated, status]);

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
