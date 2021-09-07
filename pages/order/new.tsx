import { GetStaticProps } from "next";

const NewOrderScreen = () => {
  return (
    <div>
      <p>New Order Screen</p>
    </div>
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
NewOrderScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default NewOrderScreen;
