import Link from "next/link";
import Head from "next/head";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Error | Not Found | reglini-dz</title>
        <meta
          name="description"
          content="An error have occured. Page not Found in reglini-dz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="px-4 my-24 lg:my-40 mx-8 lg:mx-24 max-w-7xl">
        <div className="text-4xl md:text-8xl font-bold my-12 md:my-24">
          Error 404
        </div>
        <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-left text-gray-800 dark:text-gray-100 md:text-4xl">
          Oops! The page you&apos;re looking for isn&apos;t here.
        </h1>
        <p className="mb-5 text-base text-left text-gray-800 dark:text-gray-100 md:text-xl">
          You might have the wrong address, or the page may have moved.
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
Custom404.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Custom404;
