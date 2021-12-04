import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const Item = ({ title, children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-black dark:border-yellow-200 dark:bg-grim rounded-lg shadow">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium">{title}</p>
        <div className="flex items-center justify-center w-8 h-8 border rounded-full">
          <svg
            viewBox="0 0 24 24"
            className={`w-3 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="2,7 12,17 22,7"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p>{children}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  return (
    <>
      <Head>
        <title>FAQ | reglini.dz</title>
        <meta
          name="description"
          content="Frequently asked questions about the services provided by reglini.dz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border-2 border-yellow-200 bg-yellow-100 dark:bg-grim rounded-lg px-4 my-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-16 sm:text-center">
            <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
              <h2 className="text-4xl font-bold">F.A.Q.</h2>
            </div>
          </div>
          <div className="space-y-4">
            <Item title="The quick, brown fox jumps over a lazy dog?">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque rem aperiam, eaque ipsa quae.
            </Item>
            <Item title="The first mate and his Skipper too will do?">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque rem aperiam, eaque ipsa quae.
            </Item>
            <Item title="Is the Space Pope reptilian!?">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque rem aperiam, eaque ipsa quae.
            </Item>
            <Item title="How much money you got on you?">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque rem aperiam, eaque ipsa quae.
            </Item>
            <p className="text-base text-center md:text-lg">
              Want to ask another question? You can do that from{" "}
              <Link href="/support" passHref>
                <a className="cursor-pointer text-gray-500 dark:text-gray-400">
                  this page
                </a>
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
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
Faq.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Faq;
