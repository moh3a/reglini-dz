import Head from "next/head";
import Contact from "../components/Contact";

const Support = () => {
  return (
    <>
      <Head>
        <title>Contact Us | reglini.dz</title>
        <meta name="description" content="reglini-dz.com homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Contact />
    </>
  );
};

import Layout from "../components/layout/Layout";
Support.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Support;
