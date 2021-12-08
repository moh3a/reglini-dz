import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useSession } from "next-auth/client";

import { IUser } from "../../../utils/types";
import { getAEProductInfo } from "../../../utils/redux/aeapiAsyncActions";
import { selectAEApi } from "../../../utils/redux/aeapiSlice";
import ProductDetails from "../../../components/aliexpress/ProductDetails";

const AliexpressProduct = ({ messages, rate, commission }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [session, loading]: [IUser | null, boolean] = useSession();

  let locale = "en";
  if (router.locale === "ar") {
    locale = "ar_MA";
  } else if (router.locale === "fr") {
    locale = "fr_FR";
  } else {
    locale = "en_US";
  }

  const converter = (price: number) => {
    return Math.ceil((price * rate + price * rate * commission) / 10) * 10;
  };

  const { product, status } = useSelector(selectAEApi);
  const { id } = router.query;
  useEffect(() => {
    if (!product && id) dispatch(getAEProductInfo({ id, locale }));
  }, [id, dispatch, product, locale]);

  if (product && product.statusId !== "0") {
    return (
      <>
        <Head>
          <title>
            {product.status === "inactive" && "Product Inactive"}
            {product.status === "productNotFound" && "Product not Found"}
            {product.status === "productNotAvailableForShipToCountry" &&
              "Item cannot be shipped to Algeria"}
            | AliExpress | reglini.dz
          </title>
          <meta
            name="description"
            content="We apologize. You can not proceed with this item. There may be a few reasons. It can be an item that no longer active on AliExpress, a product that is not found, or the issue that is more common, is that some items are illegal to enter algerian soils or the seller does not ship to the country."
          />
        </Head>
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
        <title>
          {product ? `${product.title} | ` : ``} Aliexpress | reglini.dz
        </title>
        <meta
          name="description"
          content={`Whenever you find in Aliexpress an item that you like, you can simply copy the item's url, pay with algerian dinars and we'll get it for you. ${
            product ? product.title : ``
          }`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {status === "loading" && (
        <Loading text="Fetching the data from Aliexpress..." />
      )}
      {product && product.status === "active" && (
        <>
          <ProductDetails
            converter={converter}
            product={product}
            session={session}
          />
        </>
      )}
    </>
  );
};

import axios from "axios";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, locale } = context;
  const { data } = await axios.get(`http://${req.headers.host}/api/commission`);
  const commission = data.data.commission;
  const response = await axios.get(`http://${req.headers.host}/api/currency`);
  const rate = response.data.data[0].live.parallel.sale;
  return {
    props: {
      rate,
      commission,
      messages: require(`../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../components/layout/Layout";
import Loading from "../../../components/layout/Loading";
AliexpressProduct.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AliexpressProduct;
