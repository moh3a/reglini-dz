import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Logo from "../components/layout/Logo";

const PrivacyPolicy = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <>
      <Head>
        <title>Privacy Policy | reglini-dz</title>
        <meta name="description" content="reglini-dz's privacy policy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-128 flex-col justify-center items-center">
        <Logo width="80" height="80" />
        <h1 className="text-4xl font-semibold my-2">Privacy Policy</h1>
      </div>
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
PrivacyPolicy.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default PrivacyPolicy;
