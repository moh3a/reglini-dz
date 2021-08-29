import { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import mongoose from "mongoose";

import dbConnect from "../config/db";
import Currency from "../components/currency/Currency";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!mongoose.connection.readyState) {
    await dbConnect();
  }
  const { req, res } = context;
  const { data } = await axios.get(`http://${req.headers.host}/api/currency`);
  const currency = data.data;
  return {
    props: { currency },
  };
};

const CurrencyView = ({ currency }: any) => {
  return (
    <>
      <Head>
        <title>Currency exchange in the algerian market | reglini.dz</title>
        <meta
          name="description"
          content="The parallel currency market in Algeria is really expenssive. And can go to over 200% the official rate."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Currency currency={currency} />
    </>
  );
};

import Layout from "../components/layout/Layout";
CurrencyView.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default CurrencyView;
