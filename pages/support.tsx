import styles from "../styles/screens/HomeScreen.module.scss";

const Support = () => {
  return <div className={styles.homescreen}>Support</div>;
};

import Layout from "../components/layout/Layout";
Support.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Support;
