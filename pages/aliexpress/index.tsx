import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/client";
import { TerminalIcon } from "@heroicons/react/outline";

import { IUser } from "../../utils/types";
import { selectAEApi } from "../../utils/redux/aeapiSlice";
import SearchAE from "../../components/aliexpress/SearchAE";
import ProductPreview from "../../components/aliexpress/ProductPreview";
import ProductList from "../../components/store/ProductList";
import RecommendedProducts from "../../components/store/RecommendedProducts";

const Aliexpress = () => {
  const [session, loading]: [IUser | null, boolean] = useSession();
  const { search, product, status } = useSelector(selectAEApi);
  const [url, setUrl] = useState("");

  const router = useRouter();
  const [commission, setCommission] = useState<number>();
  const [rate, setRate] = useState<number>();
  const fetchCommission = useCallback(async () => {
    const { data } = await axios.get(`/api/commission`);
    setCommission(data.data.commission);
  }, []);
  const fetchRate = useCallback(async () => {
    const { data } = await axios.get(`/api/currency`);
    setRate(data.data[0].live.parallel.sale);
  }, []);
  useEffect(() => {
    fetchCommission();
    fetchRate();
  }, [fetchCommission, fetchRate]);

  const [message, setMessage] = useState("");
  useEffect(() => {
    if (router.locale === "en") {
      setMessage("Fetching data from Aliexpress...");
    } else if (router.locale === "fr") {
      setMessage("Récupération des données d'Aliexpress...");
    } else if (router.locale === "ar") {
      setMessage("إحضار البيانات");
    }
  }, [router.locale]);

  const converter = (price: number) => {
    if (rate && commission)
      return Math.ceil((price * rate + price * rate * commission) / 10) * 10;
  };

  if (product && product.statusId !== "0") {
    return (
      <>
        <Head>
          <title>
            {product.status === "inactive" ? "Product Inactive |" : ""}
            {product.status === "productNotFound" ? "Product not Found | " : ""}
            {product.status === "productNotAvailableForShipToCountry"
              ? "Item cannot be shipped to Algeria | "
              : ""}
            AliExpress | reglini-dz
          </title>
          <meta
            name="description"
            content="We apologize. You can not proceed with this item. There may be a few reasons. It can be an item that no longer active on AliExpress, a product that is not found, or the issue that is more common, is that some items are illegal to enter algerian soils or the seller does not ship to the country."
          />
        </Head>
        <SearchAE url={url} setUrl={setUrl} />
        <section className="bg-red-50 dark:bg-red-900 text-gray-800 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto text-center text-4xl font-semibold">
            {product.status === "inactive" &&
              "The product you searched is no longer active.."}
            {product.status === "productNotFound" &&
              "Ooops... Product not found."}
            {product.status === "productNotAvailableForShipToCountry" &&
              "Ooops... This item is not available for shipping to Algeria."}
            <Link href="/aliexpress" passHref>
              <a className="text-gray-600 underline block text-base mt-4 hover:text-gray-500">
                Continue shopping
              </a>
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Search Aliexpress items | reglini-dz</title>
        <meta
          name="description"
          content="Buying items from AliExpress and with Algerian Dinars? Now that's possible here in reglini-dz. Safe and reliable algerian online shopping."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchAE url={url} setUrl={setUrl} />
      {status === "loading" ? (
        <div className="w-full flex justify-center items-center my-10">
          <div>{message}</div>
        </div>
      ) : (
        <>
          {product && product.status === "active" && rate && commission && (
            <ProductPreview
              converter={converter}
              session={session}
              product={product}
            />
          )}
          {search && rate && commission && (
            <ProductList
              converter={converter}
              session={session}
              search={search}
              url={url}
            />
          )}
        </>
      )}
      {status === "failed" && (
        <div className="w-full h-128 flex justify-center items-center text-2xl font-semibold select-none">
          <TerminalIcon className="h-10 w-10 inline mr-4" aria-hidden="true" />_
          undergoing maintenance
        </div>
      )}
      <RecommendedProducts />
    </>
  );
};

import axios from "axios";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
Aliexpress.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Aliexpress;
