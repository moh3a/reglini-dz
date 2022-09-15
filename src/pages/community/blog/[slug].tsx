import { useEffect } from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";

import Blog from "../../../components/community/Blog";
import { getBlogDetails } from "../../../utils/redux/blogsSlice";

const BlogScreen = ({ data }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getBlogDetails(data));
  }, [dispatch, data]);

  if (!data.success) {
    router.replace("/community");
  }

  return (
    <>
      <Head>
        <title>{data.data.title} | Blog | reglini-dz</title>
        <meta
          name="description"
          content={data.data.raw_text.substring(0, 200)}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Blog />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const { data } = await axios.get(
    `https://reglini-dz.com/api/community/blogslug/${params?.slug}`
  );
  return {
    props: { data, messages: require(`../../../../locales/${locale}.json`) },
  };
};

import Layout from "../../../components/layout/Layout";
BlogScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default BlogScreen;
