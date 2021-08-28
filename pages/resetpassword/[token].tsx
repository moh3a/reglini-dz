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
        <meta name="description" content="reglini-dz.com homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResetPassword token={token} />
    </>
  );
};

import Layout from "../../components/layout/Layout";
ResetPasswordScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ResetPasswordScreen;
