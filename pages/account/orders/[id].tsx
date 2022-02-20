import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/client";

import OrderDetails from "../../../components/account/Order/OrderDetails";
import { IUser } from "../../../types";
import { selectUser } from "../../../utils/redux/userSlice";

const OrderScreen = () => {
  const router = useRouter();
  const [session, loading]: [IUser | null, boolean] = useSession();
  const { isAuthenticated, user } = useSelector(selectUser);
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
  }, [router, session, loading, isAuthenticated]);

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
      {/* <div>{order && <OrderDetails order={order} />}</div> */}
      {id && <OrderDetails id={id as string} />}
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
OrderScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default OrderScreen;
