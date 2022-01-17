import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import DropshipperProductDetails from "../../../components/aliexpress_v2/dropshipper/ProductDetails";
import BasicProductDetails from "../../../components/aliexpress_v2/basic/ProductDetails";
import {
  IDropshipperProductDetails,
  IBasicProductDetails,
} from "../../../utils/AETypes";

const AliexpressProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [commission, setCommission] = useState<number>();
  const [rate, setRate] = useState<number>();

  const converter = (price: number) => {
    if (rate && commission)
      return Math.ceil((price * rate + price * rate * commission) / 10) * 10;
  };

  const [dropshipperProduct, setDropshipperProduct] =
    useState<IDropshipperProductDetails["result"]>();
  const [basicProduct, setBasicProduct] =
    useState<IBasicProductDetails["result"]>();

  const fetchProduct = useCallback(async () => {
    const { data } = await axios.post("/api/aliexpress/ds/product/detail", {
      id,
      locale: router.locale?.toUpperCase(),
    });
    if (data.success) {
      setCommission(data.commission);
      setRate(data.rate);
      if (data.dropshipper) setDropshipperProduct(data.data);
      if (!data.dropshipper) setBasicProduct(data.data);
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
      {!rate && !commission && (
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
