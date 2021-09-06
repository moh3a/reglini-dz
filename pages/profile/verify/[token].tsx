import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import AccountVerification from "../../../components/account/AccountVerification";
import Profile from "..";

const AccountVerificationScreen = () => {
  const router = useRouter();
  const token: unknown = router.query;
  return (
    <>
      <Head>
        <title>Account Verification | reglini.dz</title>
        <meta
          name="description"
          content="Verify the email address entered when signin up to be able to purchase items from Aliexpress or subscribe to the offered services."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {token && <AccountVerification token={token as string} />}
      <Profile />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../components/layout/Layout";
AccountVerificationScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AccountVerificationScreen;
