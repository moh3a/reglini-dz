import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/client";

import AccountVerification from "../../../components/account/AccountVerification";
import Profile from "..";

const AccountVerificationScreen = ({ session, token }: any) => {
  return (
    <>
      <Head>
        <title>Account Verification | reglini.dz</title>
        <meta name="description" content="reglini-dz.com homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {token && <AccountVerification token={token} />}
      <Profile session={session} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;
  const session = await getSession({ req });
  const token = query.token;

  return {
    props: { session, token },
  };
};

import Layout from "../../../components/layout/Layout";
AccountVerificationScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AccountVerificationScreen;
