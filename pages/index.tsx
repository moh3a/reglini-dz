import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
import Head from "next/head";
import { getSession } from "next-auth/client";

import dbConnect from "../config/db";

import { selectUser, getUser } from "../utils/redux/userSlice";
import SessionCTA from "../components/sections/SessionCTA";
import AliexpressCTA from "../components/sections/AliexpressCTA";
import AppCTA from "../components/sections/AppCTA";

const HomeScreen = ({ session }: any) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // TEMPORARY FOR LOGGING OUT WHEN CLOSING WINDOW
  if (typeof window !== "undefined") {
    window.onclose = () => {
      localStorage.removeItem("authToken");
    };
  }

  useEffect(() => {
    if (!user.isAuthenticated && session && user.status !== "loading") {
      const email = session.user.email;
      const type = session.user.type;
      const provider = session.user.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [session, dispatch, user]);

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
  const { req, res } = context;
  const session = await getSession({ req });

  return {
    props: { session },
  };
};

export default HomeScreen;
