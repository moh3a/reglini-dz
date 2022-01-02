import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import AdminSidebar from "../../components/admin/AdminSidebar";
import { IUser } from "../../utils/types";
import { selectUser } from "../../utils/redux/userSlice";
import { getUser } from "../../utils/redux/userAsyncActions";

const AdminScreen = ({ children }: { children: ReactNode }) => {
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
        <title>reglini-dz Admin Page</title>
        <meta name="description" content="Private admin page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && user.role === "admin" && (
        <div className="flex">
          <AdminSidebar user={user} />
          <div className="ml-20 px-5 w-full bg-white dark:bg-grim">
            <h1 className="my-10 text-2xl font-bold">Welcome {user.name}.</h1>

            {children}
          </div>
        </div>
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

export default AdminScreen;
