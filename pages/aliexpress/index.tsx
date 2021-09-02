import { useSelector } from "react-redux";
import Head from "next/head";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
import { getSession } from "next-auth/client";

import dbConnect from "../../config/db";
import { selectAEApi } from "../../utils/redux/aeapiSlice";
import SearchAE from "../../components/aliexpress/SearchAE";
import ProductPreview from "../../components/aliexpress/ProductPreview";
import ProductList from "../../components/store/ProductList";
import CategoryFilters from "../../components/store/CategoryFilters";

const Aliexpress = ({ session }: any) => {
  const { search, product, status } = useSelector(selectAEApi);

  return (
    <>
      <Head>
        <title>Search Aliexpress items | reglini.dz</title>
        <meta
          name="description"
          content="Buying items from AliExpress and with Algerian Dinars? Now that's possible here in reglini.dz. Safe and reliable algerian online shopping."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchAE />
      {status === "loading" && (
        <Loading text="Fetching data from Aliexpress..." />
      )}
      {product && <ProductPreview session={session} product={product} />}
      {search && <ProductList session={session} search={search} />}
      <CategoryFilters />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!mongoose.connection.readyState) {
    await dbConnect();
  }
  const { req } = context;
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
