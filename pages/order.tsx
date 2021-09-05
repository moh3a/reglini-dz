const OrderScreen = () => {
  return (
    <div>
      <p>Order Screen</p>
    </div>
  );
};

import Layout from "../components/layout/Layout";
OrderScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default OrderScreen;
