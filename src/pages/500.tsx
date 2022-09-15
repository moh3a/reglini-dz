import Head from "next/head";
import Link from "next/link";

const Custom500 = () => {
  return (
    <>
      <Head>
        <title>Error | Internal Server Error | reglini-dz</title>
        <meta
          name="description"
          content="An internal server error have occured in reglini-dz. We apologize for the inconvenience. We're working on it."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="px-4 my-24 lg:my-40 mx-8 lg:mx-24 max-w-7xl">
        <div className="text-4xl md:text-8xl font-bold my-12 md:my-24">
          Internal Server Error 500
        </div>
        <p className="mb-5 text-base text-left text-gray-800 dark:text-gray-100 md:text-xl">
          Sorry this is not working properly. We know about this issue and we
          are working to fix it. Thanks for understanding!
        </p>
        <Link href="/" passHref>
          <a className="block underline w-full mb-2 sm:w-auto sm:mb-0 text-gray-800 dark:text-gray-100 cursor-pointer">
            Back to homepage
          </a>
        </Link>
        <Link href="/support" passHref>
          <a className="block underline w-full mb-2 sm:w-auto sm:mb-0 text-gray-800 dark:text-gray-100 cursor-pointer">
            Contact us
          </a>
        </Link>
      </section>
    </>
  );
};

import Layout from "../components/layout/Layout";
Custom500.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Custom500;
