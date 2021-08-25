import Head from "next/head";
import styles from "../styles/screens/HomeScreen.module.scss";

const TermsOfService = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | reglini.dz</title>
        <meta name="description" content="reglini-dz.com homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.homescreen}>Terms of Service</div>
    </>
  );
};

import Layout from "../components/layout/Layout";
TermsOfService.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default TermsOfService;
