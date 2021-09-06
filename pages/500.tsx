import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

const Custom500 = () => {
  return (
    <>
      <Head>
        <title>Error | Internal Server Error | reglini.dz</title>
        <meta
          name="description"
          content="An internal server error have occured in reglini.dz. We apologize for the inconvenience. We're working on it."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="px-4 my-24 lg:my-40 mx-8 lg:mx-24 max-w-7xl">
        <p className="mb-2 text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-200 uppercase">
          Error 500
        </p>
        <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-left text-gray-800 dark:text-gray-100 md:text-4xl">
          Internal Server Error (500)
        </h1>
        <p className="mb-5 text-base text-left text-gray-800 dark:text-gray-100 md:text-xl">
          Sorry this is not working properly. We know about this issue and we
          are working to fix it. Thanks for understanding!
        </p>
        <Link href="/" passHref>
          <span className="block w-full mb-2 sm:w-auto sm:mb-0 text-gray-800 dark:text-gray-100 cursor-pointer">
            Back to homepage
          </span>
        </Link>
        <Link href="/support" passHref>
          <span className="block w-full mb-2 sm:w-auto sm:mb-0 text-gray-800 dark:text-gray-100 cursor-pointer">
            Contact us
          </span>
        </Link>
      </section>
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
Custom500.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Custom500;
