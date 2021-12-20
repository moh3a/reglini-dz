import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/client";

import { IUser } from "../../utils/types";
import AccountDetails from "../../components/account/AccountDetails";
import { selectUser } from "../../utils/redux/userSlice";
import { getUser } from "../../utils/redux/userAsyncActions";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [session, loading]: [IUser | null, boolean] = useSession();
  const { isAuthenticated, user, status } = useSelector(selectUser);

  useEffect(() => {
    if (!loading && !session && !isAuthenticated)
      router.push({
        pathname: "/login/[message]",
        query: { message: "login_to_view_account" },
      });
    // if (!isAuthenticated && session && status !== "loading") {
    //   const email = session.user?.email;
    //   const type = session.user?.type;
    //   const provider = session.user?.provider || undefined;
    //   dispatch(getUser({ email, account: type, provider }));
    // }
  }, [router, session, loading, dispatch, isAuthenticated, status]);

  return (
    <>
      <Head>
        <title>
          {session && session.user?.name
            ? `${session.user.name}'s profile | `
            : ``}
          reglini-dz
        </title>
        <meta name="description" content="reglini-dz user's profile page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <AccountDetails />}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
Profile.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Profile;
