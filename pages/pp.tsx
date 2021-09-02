import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | reglini.dz</title>
        <meta name="description" content="reglini.dz's privacy policy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Privacy Policy</div>
    </>
  );
};

import Layout from "../components/layout/Layout";
PrivacyPolicy.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default PrivacyPolicy;
