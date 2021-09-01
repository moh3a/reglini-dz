import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
import Head from "next/head";
import { getSession } from "next-auth/client";

import dbConnect from "../config/db";

import { selectUser } from "../utils/redux/userSlice";
import { getUser } from "../utils/redux/userAsyncActions";
import SessionCTA from "../components/sections/SessionCTA";
import AliexpressCTA from "../components/sections/AliexpressCTA";
import AppCTA from "../components/sections/AppCTA";

const HomeScreen = ({ session }: any) => {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector(selectUser);

  useEffect(() => {
    if (!isAuthenticated && session && status !== "loading") {
      const email = session.user.email;
      const type = session.user.type;
      const provider = session.user.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [session, dispatch, isAuthenticated, status]);

  return (
    <>
      <Head>
        <title>reglini.dz</title>
        <meta name="description" content="reglini-dz.com homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AliexpressCTA />
      <SessionCTA session={session} />
      <AppCTA />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!mongoose.connection.readyState) {
    await dbConnect();
  }
  const { req, res, locale } = context;
  const session = await getSession({ req });

  return {
    props: {
      session,
      messages: require(`../locales/${locale}.json`),
    },
  };
};

import Layout from "../components/layout/Layout";
HomeScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default HomeScreen;
