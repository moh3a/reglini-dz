import { useEffect } from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useDispatch } from "react-redux";
import axios from "axios";

import Blog from "../../../components/community/Blog";
import { getBlogDetails } from "../../../utils/redux/blogsSlice";

const BlogScreen = ({ data }: any) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getBlogDetails(data));
  // }, [dispatch, data]);

  return (
    <>
      {/* <Head>
        <title>{data.data.title} | Blog | reglini-dz</title>
        <meta
          name="description"
          content={data.data.raw_text.substring(0, 200)}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Blog />
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

// export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
//     const {data} = await axios.get(
//       `${process.env.NEXTAUTH_URL}/api/community/blogslug/${params?.slug}`
//     );
//   return {
//     props: {
//       data,
//       messages: require(`../../../locales/${locale}.json`),
//     },
//     revalidate: 30,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async ({}) => {
//   const { data } = await axios.post(
//     `${process.env.NEXTAUTH_URL}/api/community`
//   );
//   const paths = data.blogs.map((blog: any) => ({
//     params: { slug: blog.slug },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

import Layout from "../../../components/layout/Layout";
BlogScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default BlogScreen;
