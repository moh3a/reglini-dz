import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import ResetPassword from "../../components/auth/ResetPassword";

const ResetPasswordScreen = ({}) => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <>
      <Head>
        <title>Reset your password | reglini.dz</title>
        <meta
          name="description"
          content="Forgot your password and requested to change it? Check your email and a link with a token is provided, you follow the link and you'll prompted to set a new password."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResetPassword token={token} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
ResetPasswordScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ResetPasswordScreen;
