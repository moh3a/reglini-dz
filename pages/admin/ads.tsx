import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import AdminScreen from "./index";
import AdminAds from "../../components/admin/AdminAds";
import { IUser } from "../../types";
import { selectUser } from "../../utils/redux/userSlice";
import { getUser } from "../../utils/redux/userAsyncActions";

const AdminAdsScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [session, loading]: [IUser | null, boolean] = useSession();
  const { isAuthenticated, status, user } = useSelector(selectUser);

  useEffect(() => {
    if (!loading && !session && !isAuthenticated) router.replace("/");
    if (
      session &&
      (status === "complete" || status === "idle") &&
      !isAuthenticated
    ) {
      dispatch(
        getUser({
          email: session.user?.email,
          account: session.user?.type,
          provider: session.user?.provider || undefined,
        })
      );
    }
    if (user && user.role !== "admin") router.replace("/");
  }, [session, dispatch, isAuthenticated, status, loading, router, user]);

  return (
    <>
      <Head>
        <title>Meta ads | reglini-dz Admin</title>
        <meta name="description" content="Private admin page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && user.role === "admin" && (
        <AdminScreen>
          <AdminAds />
        </AdminScreen>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

export default AdminAdsScreen;
