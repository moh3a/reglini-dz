import styles from "../styles/screens/HomeScreen.module.scss";

const PrivacyPolicy = () => {
  return <div className={styles.homescreen}>Privacy Policy</div>;
};

import Layout from "../components/layout/Layout";
PrivacyPolicy.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default PrivacyPolicy;
