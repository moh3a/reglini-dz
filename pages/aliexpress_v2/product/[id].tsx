import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import DropshipperProductDetails from "../../../components/aliexpress_v2/dropshipper/ProductDetails";
import BasicProductDetails from "../../../components/aliexpress_v2/basic/ProductDetails";
import {
  IDSProductDetails,
  IDSapiProductDetails,
} from "../../../utils/AETypes";

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
  const [dropshipperProduct, setDropshipperProduct] =
    useState<IDSProductDetails>();
  const [basicProduct, setBasicProduct] =
    useState<IDSapiProductDetails["result"]>();
  const fetchProduct = useCallback(async () => {
    const { data } = await axios.post("/api/aliexpress/ds/product/detail", {
      id,
      locale: router.locale?.toUpperCase(),
    });
    if (data.dropshipper) {
      setDropshipperProduct(data.data);
    } else {
      setBasicProduct(data.data);
    }
    console.log(data.data);
  }, [id, router.locale]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <>
      {basicProduct && rate && commission && (
        <BasicProductDetails product={basicProduct} converter={converter} />
      )}
      {dropshipperProduct && rate && commission && (
        <DropshipperProductDetails
          product={dropshipperProduct}
          converter={converter}
        />
      )}
      {(!basicProduct || !dropshipperProduct) && !rate && !commission && (
        <div className="w-full h-128 text-xl font-bold select-none flex justify-center items-center">
          <Logo height={50} width={50} />
          Fetching data from AliExpress...
        </div>
      )}
      {basicProduct && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-800">
          basic request
        </p>
      )}
      {dropshipperProduct && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-800">
          dropshipper request
        </p>
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
AliexpressProduct.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AliexpressProduct;
