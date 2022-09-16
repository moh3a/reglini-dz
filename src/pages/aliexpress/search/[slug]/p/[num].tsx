import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { unslugify } from "unslugify";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import { selectUser } from "../../../../../utils/redux/userSlice";
import MiniSearchAE from "../../../../../components/aliexpress_v3/MiniSearchAE";
import ProductsList from "../../../../../components/aliexpress_v3/ProductsList";
import Logo from "../../../../../components/layout/Logo";

const AliexpressSearchPage = () => {
  const [totalRecordCount, setTotalRecordCount] = useState<number>();
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(true);

  const { user } = useSelector(selectUser);
  const router = useRouter();
  const { num, slug } = router.query;

  const queryAE = useCallback(async () => {
    if (num && slug) {
      setLoading(true);
      const { data } = await axios.post(
        "/api/aliexpress/affiliate/product/query",
        {
          page: num,
          keywords: slug,
          locale: router.locale,
        }
      );
      if (data.success && data.data) {
        setProducts(data.data.products.product);
        setTotalRecordCount(data.data.total_record_count);
        setLoading(false);
      } else {
        router.replace(`/aliexpress/search/${slug}`);
      }
    }
  }, [router, num, slug]);

  useEffect(() => {
    if (num && Number(num) < 2) {
      router.push(`/aliexpress/search/${slug}`);
    }
  }, [num, router, slug]);

  useEffect(() => {
    queryAE();
  }, [queryAE, router.query]);

  const callaeauth = async () => {
    const { data } = await axios.post("/api/aliexpress/auth");
    if (data.success) router.push(data.data);
  };

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
      <MiniSearchAE />
      {loading ? (
        <div className="w-full h-24 text-xl font-bold select-none flex justify-center items-center">
          <Logo height={50} width={50} />
          Fetching data from AliExpress...
        </div>
      ) : (
        <h2 className="text-2xl w-full text-center mt-4">
          Search results for: {unslugify(slug)}
        </h2>
      )}
      {products && (
        <>
          <ProductsList products={products} />
          <div className="flex justify-center items-center text-xl mt-2 mb-6">
            <ChevronLeftIcon
              onClick={() =>
                router.push(`/aliexpress/search/${slug}/p/${Number(num) - 1}`)
              }
              className="h-6 w-6 inline mr-3 cursor-pointer border border-black dark:border-white rounded-full p-1"
              aria-hidden="true"
            />
            page {num}
            {totalRecordCount && totalRecordCount - 50 * Number(num) < 0 ? (
              <ChevronRightIcon
                className="h-6 w-6 inline ml-3 cursor-not-allowed border text-gray-300 border-gray-300 dark:text-black dark:border-black rounded-full p-1"
                aria-hidden="true"
              />
            ) : (
              <ChevronRightIcon
                onClick={() =>
                  router.push(`/aliexpress/search/${slug}/p/${Number(num) + 1}`)
                }
                className="h-6 w-6 inline ml-3 cursor-pointer border border-black dark:border-white rounded-full p-1"
                aria-hidden="true"
              />
            )}
          </div>
        </>
      )}

    </>
  );
};

import axios from "axios";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      messages: require(`../../../../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../../../components/layout/Layout";
AliexpressSearchPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AliexpressSearchPage;
