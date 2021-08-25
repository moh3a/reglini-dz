import Head from "next/head";
import styles from "../styles/screens/HomeScreen.module.scss";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | reglini.dz</title>
        <meta name="description" content="reglini-dz.com homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.homescreen}>Privacy Policy</div>
    </>
  );
};

import Layout from "../components/layout/Layout";
PrivacyPolicy.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default PrivacyPolicy;
