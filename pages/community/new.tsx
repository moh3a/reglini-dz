import { useEffect } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import CreateBlog from "../../components/community/CreateBlog";

const NewBlogScreen = () => {
  const router = useRouter();
  const { status, user } = useSelector(selectUser);
  useEffect(() => {
    if (status === "complete" && !user) router.replace("/community");
  }, [user, status, router]);

  return (
    <>
      <Head>
        <title>Community | reglini-dz</title>
        <meta
          name="description"
          content="Welcome to reglini-dz (reglini-dz.com). Checkout the services we provide, from buying from Aliexpress using algerians dinars, to subscribing to Netflix and many more to come."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateBlog />
    </>
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
import { selectUser } from "../../utils/redux/userSlice";
NewBlogScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default NewBlogScreen;
