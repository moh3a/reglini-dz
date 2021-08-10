import s from "../styles/screens/HomeScreen.module.scss";

const HomeScreen = () => {
  return (
    <div className={s.homescreen}>
      <div>REGLINI.DZ APP IS CURRENTLY UNDER DEVELOPMENT.</div>
    </div>
  );
};

import Layout from "../components/layout/Layout";
HomeScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default HomeScreen;
