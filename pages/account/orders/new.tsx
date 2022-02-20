import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/client";

import { IUser } from "../../../types";
import { selectUser } from "../../../utils/redux/userSlice";
import NewOrder from "../../../components/account/Order/NewOrder";

const NewOrderScreen = () => {
  const t = useTranslations("NewOrder");
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
  }, [router, session, loading, dispatch, isAuthenticated, status]);

  useEffect(() => {
    if (
      user &&
      !localStorage.getItem("aeno") &&
      user.cart.cartItems.length === 0
    ) {
      router.replace("/account/orders");
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Place new order | reglini-dz</title>
        <meta
          name="description"
          content="Time to checkout? Setup the needed informations for Aliexpress shipping, and your product will be on its way. reglini-dz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user &&
        (!router.query || !router.query.ref || router.query.ref !== "cart") &&
        localStorage.getItem("aeno") && (
          <>
            <h1 className="px-4 pt-5 sm:px-6">{t("directOrder")}</h1>
            <NewOrder
              products={JSON.parse(localStorage.getItem("aeno") as string)}
              origin={"localStorage"}
            />
          </>
        )}
      {user &&
        router.query &&
        router.query.ref === "cart" &&
        user.cart.cartItems.length > 0 && (
          <>
            <h1 className="px-4 pt-5 sm:px-6">{t("fromCart")}</h1>
            <NewOrder products={user.cart.cartItems} origin={"cart"} />
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
