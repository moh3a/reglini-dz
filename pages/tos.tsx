import Head from "next/head";

const TermsOfService = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | reglini.dz</title>
        <meta name="description" content="reglini.dz's terms of service." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Terms of Service</div>
    </>
  );
};

import { GetStaticProps } from "next";
export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
};

import Layout from "../components/layout/Layout";
TermsOfService.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default TermsOfService;
