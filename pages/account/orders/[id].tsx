import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/client";

import { IUser } from "../../../utils/types";
import { selectUser } from "../../../utils/redux/userSlice";
import { getOrderDetails } from "../../../utils/redux/userAsyncActions";

const OrderScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [session, loading]: [IUser | null, boolean] = useSession();
  const { isAuthenticated, user, status } = useSelector(selectUser);
  const { id } = router.query;

  let order: any = null;
  if (user && id) {
    const index = user.orders.findIndex((order: any) => order.orderId === id);
    if (index !== -1) {
      order = user.orders[index];
    }
  }

  useEffect(() => {
    if (!loading && !session && !isAuthenticated) {
      router.push({
        pathname: "/login/[message]",
        query: { message: "login_to_view_orders" },
      });
    }
    // else if (user && id) {
    //   dispatch(getOrderDetails({ id }));
    // }
  }, [router, session, loading, isAuthenticated]);

  //   useEffect(() => {
  //     dispatch(getOrderDetails({ id }));
  //   }, []);

  return (
    <>
      <Head>
        <title>
          {id ? `${id}'s ` : ``}
          order details | reglini-dz
        </title>
        <meta name="description" content="reglini-dz user's order details." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{order && <OrderDetails order={order} />}</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      messages: require(`../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../components/layout/Layout";
import OrderDetails from "../../../components/account/Order/OrderDetails";
OrderScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default OrderScreen;
