import { GetStaticProps } from "next";

const OrderScreen = () => {
  return (
    <div>
      <p>Order Screen</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
};

import Layout from "../components/layout/Layout";
OrderScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default OrderScreen;
