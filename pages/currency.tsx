import { GetServerSideProps, GetStaticProps } from "next";
import axios from "axios";
import Head from "next/head";
import Currency from "../components/currency";

const CurrencyView = ({ currency }: any) => {
  return (
    <>
      <Head>
        <title>Currency exchange in the algerian market | reglini-dz</title>
        <meta
          name="description"
          content="The parallel currency market in Algeria is really weird. And can go to over 200% the official rate. Get the up to date daily rates."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Currency currency={currency} />
    </>
  );
};

import dbConnect from "../config/db";
import CurrencyModel from "../models/Currency";
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  await dbConnect();
  const currency = await CurrencyModel.find().select("live exchange -_id");
  return {
    props: {
      currency,
      messages: require(`../locales/${locale}.json`),
    },
  };
};

import Layout from "../components/layout/Layout";
CurrencyView.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default CurrencyView;
