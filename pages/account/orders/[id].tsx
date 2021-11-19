import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/client";

import { IUser } from "../../../utils/types";
import { selectUser } from "../../../utils/redux/userSlice";
import { getUser } from "../../../utils/redux/userAsyncActions";

const OrderDetailsScreen = () => {
  const router = useRouter();
  const id = router.query;
  const dispatch = useDispatch();
  const [session, loading]: [IUser | null, boolean] = useSession();
  const { isAuthenticated, user, status } = useSelector(selectUser);

  useEffect(() => {
    if (!loading && !session && !isAuthenticated)
      router.push({
        pathname: "/login/[message]",
        query: { message: "login_to_view_orders" },
      });
    if (!isAuthenticated && session && status !== "loading") {
      const email = session.user?.email;
      const type = session.user?.type;
      const provider = session.user?.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [router, session, loading, dispatch, isAuthenticated, status]);

  return (
    <>
      <Head>
        <title>
          {id ? `Order ${id} details | ` : ``}
          reglini.dz
        </title>
        <meta name="description" content="Details for the Aliexpress order." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{user && <OrderDetails user={user} />}</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../components/layout/Layout";
import OrderDetails from "../../../components/account/OrderDetails";
OrderDetailsScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default OrderDetailsScreen;
