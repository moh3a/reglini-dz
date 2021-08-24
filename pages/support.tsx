import Contact from "../components/Contact";

const Support = () => {
  return (
    <>
      <Contact />
    </>
  );
};

import Layout from "../components/layout/Layout";
Support.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Support;
