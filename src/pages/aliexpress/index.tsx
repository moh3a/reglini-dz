import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { selectUser } from "../../utils/redux/userSlice";
import SearchAE from "../../components/aliexpress_v3/SearchAE";

const Aliexpress = () => {
  const { user } = useSelector(selectUser);
  const router = useRouter();

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
      <SearchAE />
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
import { GetStaticProps } from "next";
export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      messages: require(`../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
Aliexpress.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Aliexpress;
