import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import ProductDetails from "../../../components/aliexpress_v2/ProductDetails";

const AliexpressProduct = () => {
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

  const converter = (price: number) => {
    if (rate && commission)
      return Math.ceil((price * rate + price * rate * commission) / 10) * 10;
  };

  const { id } = router.query;
  const [product, setProduct] = useState<any>();
  const fetchProduct = useCallback(async () => {
    const { data } = await axios.post("/api/aliexpress/ds/product/detail", {
      id,
      locale: router.locale?.toUpperCase(),
    });
    console.log(data.data);
    setProduct(data.data);
  }, [id, router.locale]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <>
      {product && rate && commission && (
        <ProductDetails product={product} converter={converter} />
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
AliexpressProduct.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AliexpressProduct;
