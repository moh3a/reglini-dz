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
            <Item title="What is the purpose of this app?">
              <p id="howitworks">
                AliExpress is one of the biggest online retail services based in
                China that offer products to international online buyers. While
                algerians are starting to use it, it is yet to be mainstream.
                And that&pos;s for many reasons, one of which is harsh algerian
                customs that imposes many rules on product imports. Another
                reason is that AliExpress only accepts major foreign currencies
                as payments. That is why we offer you to purchase from
                AliExpress and have it shipped to your town, using the local
                algerian dinars.
              </p>
            </Item>
            <Item title="Why order from reglini-dz?">
              There are several Algerian online services that take customer
              requests and take care of ordering and paying Aliexpress while
              receiving their payments in DZD. Basically this is also what
              reglini-dz does, but also allows a great user experience, who has
              full access to products, orders and package tracking. All this is
              automatic and without the need for intermediary help.
            </Item>
            <Item title="How does ordering from reglini-dz work?">
              <ul>
                <li>
                  - First you find an item that you like, check if it can be
                  shipped to Algeria and at what price.
                </li>
                <li>
                  - Select the properties of the item then add it to cart, or
                  even directly buy it.
                </li>
                <li>
                  - Buying an item is submitting an order, that needs the real
                  legal name and the full correct address and phone number of
                  the buyer.
                </li>
                <li>
                  - If all the informations are validated, an order is created.
                  The buyer then has 48 hours to submit a payment with the
                  order&apos;s total amount. If no payment was submitted in 48
                  hours, the order will be automatically cancelled.
                </li>
                <li>- The payment should be once and with the total amount.</li>
                <li>
                  - After the payment was submitted and validated, you can then
                  check the status of your order, and even see the tracking of
                  your item -if your product&apos;s carrier provides it.
                </li>
              </ul>
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
