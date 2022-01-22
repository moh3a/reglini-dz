import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { unslugify } from "unslugify";

import { selectUser } from "../../../utils/redux/userSlice";
import MiniSearchAE from "../../../components/aliexpress_v3/MiniSearchAE";

const AliexpressSearch = () => {
  const [commission, setCommission] = useState<number>();
  const [rate, setRate] = useState<number>();
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(true);

  const { user } = useSelector(selectUser);
  const router = useRouter();
  const { slug } = router.query;

  const converter = (price: number) => {
    if (rate && commission)
      return Math.ceil((price * rate + price * rate * commission) / 10) * 10;
  };

  const queryAE = useCallback(async () => {
    if (slug) {
      setLoading(true);
      const { data } = await axios.post(
        "/api/aliexpress/affiliate/product/query",
        {
          keywords: slug,
          locale: router.locale,
        }
      );
      setProducts(data.data.products.product);
      setCommission(data.commission);
      setRate(data.rate);
      setLoading(false);
      console.log(data);
    }
  }, [router.locale, slug]);

  useEffect(() => {
    queryAE();
  }, [queryAE]);

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
      {slug && <MiniSearchAE slug={slug} />}
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
      {products && <ProductsList products={products} converter={converter} />}
      {user && (!user.aeCredentials || !user.aeCredentials.token) && (
        <div className="px-5 py-6 flex flex-col justify-center items-center">
          <h2>
            You can connect to your AliExpress account to get custom results
            from AliExpress tailored for you.
          </h2>
          <button
            onClick={callaeauth}
            type="button"
            className="border border-aliexpress bg-aliexpress text-white px-3 py-1"
          >
            Connect to Aliexpress
          </button>
        </div>
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
      messages: require(`../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../components/layout/Layout";
import ProductsList from "../../../components/aliexpress_v3/ProductsList";
import Logo from "../../../components/layout/Logo";
AliexpressSearch.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AliexpressSearch;
