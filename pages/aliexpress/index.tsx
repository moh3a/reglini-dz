import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
import { getSession } from "next-auth/client";

import dbConnect from "../../config/db";
import { categories } from "../../data/AliExpressCategories";
import { selectAEApi } from "../../utils/redux/aeapiSlice";
import SearchAE from "../../components/aliexpress/SearchAE";
import ProductPreview from "../../components/aliexpress/ProductPreview";
import ProductList from "../../components/store/ProductList";

const Aliexpress = ({ session }: any) => {
  const { search, product, status } = useSelector(selectAEApi);
  // useEffect(() => {
  //   if (!search) {
  //     dispatch(
  //       searchAEProductByCategory(
  //         categories[Math.round(Math.random() * (100 / 3.5))].id
  //       )
  //     );
  //   }
  // }, [search, dispatch]);

  return (
    <>
      <Head>
        <title>Search Aliexpress items | reglini.dz</title>
        <meta name="description" content="reglini-dz.com homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchAE />
      {status === "loading" && (
        <Loading text="Fetching data from Aliexpress..." />
      )}
      {product && <ProductPreview session={session} product={product} />}
      {search && <ProductList session={session} search={search} />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!mongoose.connection.readyState) {
    await dbConnect();
  }
  const { req, res } = context;
  const session = await getSession({ req });

  return {
    props: { session },
  };
};

import Layout from "../../components/layout/Layout";
import Loading from "../../components/Loading";
Aliexpress.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Aliexpress;
