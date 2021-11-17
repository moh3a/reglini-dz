import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/client";

import { IUser } from "../../../utils/types";
import { selectUser } from "../../../utils/redux/userSlice";
import { getUser } from "../../../utils/redux/userAsyncActions";
import NewOrder from "../../../components/account/NewOrder";

const NewOrderScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [session, loading]: [IUser | null, boolean] = useSession();
  const { isAuthenticated, user, status } = useSelector(selectUser);

  useEffect(() => {
    if (!loading && !session && !isAuthenticated)
      router.push({
        pathname: "/login/[message]",
        query: { message: "login_to_place_order" },
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
        <title>Place new order | reglini.dz</title>
        <meta
          name="description"
          content="Time to checkout? Setup the needed informations for Aliexpress shipping, and your product will be on its way. reglini-dz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && localStorage.getItem("aeno") && (
        <>
          <h3 className="px-4 pt-5 sm:px-6">Direct order</h3>
          {/* delete aeno from localStorage */}
          <NewOrder
            user={user}
            products={JSON.parse(localStorage.getItem("aeno") as string)}
          />
        </>
      )}
      {user && user.cart.cartItems.length > 0 && (
        <>
          <h3 className="px-4 pt-5 sm:px-6">From cart</h3>
          <NewOrder user={user} products={user.cart.cartItems} />
        </>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../../components/layout/Layout";
NewOrderScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default NewOrderScreen;
