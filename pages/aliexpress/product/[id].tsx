import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { getSession } from "next-auth/client";

import { getAEProductInfo } from "../../../utils/redux/aeapiAsyncActions";
import { selectAEApi } from "../../../utils/redux/aeapiSlice";
import ProductDetails from "../../../components/store/ProductDetails";
import ProductFeatures from "../../../components/store/ProductFeatures";

const AliexpressProduct = ({ session }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { product } = useSelector(selectAEApi);
  const { id } = router.query;
  useEffect(() => {
    if (!product && id) dispatch(getAEProductInfo(id));
  }, [id, dispatch, product]);

  return (
    <>
      <Head>
        <title>{product.title} | Aliexpress | reglini.dz</title>
        <meta name="description" content="reglini-dz.com homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductDetails product={product} session={session} />
      <ProductFeatures product={product} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  //   const id = req.url?.split("product/")[1];
  //   const { data } = await axios.get(
  //     `http://${req.headers.host}/api/aliexpress/${id}`
  //   );
  //   const product = data.data;
  return {
    props: { session },
  };
};

import Layout from "../../../components/layout/Layout";
AliexpressProduct.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AliexpressProduct;
