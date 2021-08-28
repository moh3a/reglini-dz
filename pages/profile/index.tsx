import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";
import mongoose from "mongoose";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut, getSession } from "next-auth/client";

import dbConnect from "../../config/db";
import Tabs from "../../components/layout/Tabs";

import { selectUser, logout } from "../../utils/redux/userSlice";
import { getUser } from "../../utils/redux/userAsyncActions";

const Profile = ({ session }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!session && !user.isAuthenticated) router.push("/login");
    if (!user.isAuthenticated && session && user.status !== "loading") {
      const email = session.user?.email;
      const type = session.user?.type;
      const provider = session.user?.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [router, session, dispatch, user]);

  const logoutHandler = () => {
    signOut();
    dispatch(logout());
  };

  return (
    <>
      <Head>
        <title>{session.user.name}&apos;s profile | reglini.dz</title>
        <meta name="description" content="reglini-dz.com homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs session={session} />
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

import Layout from "../../components/layout/Layout";
Profile.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Profile;
