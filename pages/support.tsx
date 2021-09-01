import { GetStaticProps } from "next";
import Head from "next/head";
import Contact from "../components/Contact";

const Support = ({ messages }: any) => {
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

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
};

import Layout from "../components/layout/Layout";
Support.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Support;
