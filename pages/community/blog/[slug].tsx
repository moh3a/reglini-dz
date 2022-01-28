import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch } from "react-redux";

import { getBlogDetails } from "../../../utils/redux/blogAsyncActions";

const BlogScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) dispatch(getBlogDetails({ slug: slug as string }));
  }, [slug, dispatch]);

  return (
    <>
      <Head>
        <title>Blog | reglini-dz</title>
        <meta
          name="description"
          content="Welcome to reglini-dz (reglini-dz.com). Checkout the services we provide, from buying from Aliexpress using algerians dinars, to subscribing to Netflix and many more to come."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Hello world</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../components/layout/Layout";
BlogScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default BlogScreen;
