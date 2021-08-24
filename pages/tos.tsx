import styles from "../styles/screens/HomeScreen.module.scss";

const TermsOfService = () => {
  return <div className={styles.homescreen}>Terms of Service</div>;
};

import Layout from "../components/layout/Layout";
TermsOfService.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default TermsOfService;
