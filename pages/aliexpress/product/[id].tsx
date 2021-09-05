import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { getSession } from "next-auth/client";

import { getAEProductInfo } from "../../../utils/redux/aeapiAsyncActions";
import { selectAEApi } from "../../../utils/redux/aeapiSlice";
import ProductDetails from "../../../components/aliexpress/ProductDetails";

const AliexpressProduct = ({ session }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let locale = "en";
  if (router.locale === "ar") {
    locale = "ar_MA";
  } else if (router.locale === "fr") {
    locale = "fr_FR";
  } else {
    locale = "en_US";
  }

  const { product, status } = useSelector(selectAEApi);
  const { id } = router.query;
  useEffect(() => {
    if (!product && id) dispatch(getAEProductInfo({ id, locale }));
  }, [id, dispatch, product, locale]);

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
      {product && (
        <>
          <ProductDetails product={product} session={session} />
        </>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, locale } = context;
  const session = await getSession({ req });
  //   const id = req.url?.split("product/")[1];
  //   const { data } = await axios.get(
  //     `http://${req.headers.host}/api/aliexpress/${id}`
  //   );
  //   const product = data.data;
  return {
    props: { session, messages: require(`../../../locales/${locale}.json`) },
  };
};

import Layout from "../../../components/layout/Layout";
import Loading from "../../../components/Loading";
AliexpressProduct.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AliexpressProduct;
