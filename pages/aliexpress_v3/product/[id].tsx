import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

import ProductDetails from "../../../components/aliexpress_v3/ProductDetails";
import { IAffiliateProduct } from "../../../utils/AETypes";

const AliexpressProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [commission, setCommission] = useState<number>();
  const [rate, setRate] = useState<number>();

  const converter = (price: number) => {
    if (rate && commission)
      return Math.ceil((price * rate + price * rate * commission) / 10) * 10;
  };

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
      setCommission(data.commission);
      setRate(data.rate);
      setProduct(data.data);
    } else {
      router.push(data.redirect);
    }
  }, [id, router]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <>
      <Head>
        <title>Aliexpress product | reglini-dz</title>
        <meta
          name="description"
          content="Query AliExpress for specific product details."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {product && rate && commission && (
        <ProductDetails product={product} converter={converter} />
      )}
      {!rate && !commission && (
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
      messages: require(`../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../components/layout/Layout";
import Logo from "../../../components/layout/Logo";
import { route } from "next/dist/next-server/server/router";
AliexpressProduct.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AliexpressProduct;
