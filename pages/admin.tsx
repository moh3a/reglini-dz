import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import Admin from "../components/admin";
import { IUser } from "../utils/types";
import { selectUser } from "../utils/redux/userSlice";
import { getUser } from "../utils/redux/userAsyncActions";

const AdminScreen = ({ messages }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [session, loading]: [IUser | null, boolean] = useSession();
  const { isAuthenticated, status, user } = useSelector(selectUser);

  useEffect(() => {
    if (!loading && !session && !isAuthenticated) router.replace("/");
    if (!isAuthenticated && session && status !== "loading") {
      const email = session.user?.email;
      const type = session.user?.type;
      const provider = session.user?.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
    if (user && user.role !== "admin") router.replace("/");
  }, [session, dispatch, isAuthenticated, status, loading, router, user]);

  return (
    <>
      <Head>
        <title>reglini-dz Admin Page</title>
        <meta name="description" content="Private admin page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && user.role === "admin" && <Admin user={user} />}
    </>
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
};

export default AdminScreen;
