import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

import Logo from "../../../components/layout/Logo";
import ProductDetails from "../../../components/aliexpress_v3/ProductDetails";
import { IAffiliateProduct } from "../../../types/AETypes";

const AliexpressProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<IAffiliateProduct>();

  const fetchProduct = useCallback(async () => {
    const { data } = await axios.post(
      "/api/aliexpress/affiliate/productdetail/get",
      {
        id,
        locale: router.locale?.toUpperCase(),
      }
    );
    if (data.success) {
      setProduct(data.data);
    } else if (!data.success && data.redirect) {
      router.push(data.redirect);
    } else if (!data.success && !data.redirect) {
      if (data.message) {
        setMessage(data.message);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      } else router.reload();
    }
  }, [id, router]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <>
      <Head>
        <title>
          {product ? product.product_title : "Aliexpress product"} | reglini-dz
        </title>
        <meta
          name="description"
          content={`Query AliExpress for specific product details. ${
            product ? "Results for: " + product.product_title : ""
          }`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {message && <AlertMessage type="warning" message={message} />}
      {product && <ProductDetails product={product} />}
      {!product && (
        <div className="w-full h-128 text-xl font-bold select-none flex justify-center items-center">
          <Logo height={50} width={50} />
          Fetching data from AliExpress...
        </div>
      )}
    </>
  );
};

import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../components/layout/Layout";
import AlertMessage from "../../../components/elements/AlertMessage";
AliexpressProduct.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AliexpressProduct;
