import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut, useSession } from "next-auth/client";

import { selectUser, logout, getUser } from "../utils/redux/userSlice";
import Loading from "../components/Loading";

const Profile = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!loading && !session && !user.isAuthenticated) router.push("/login");
    if (!user.isAuthenticated && session && user.status !== "loading") {
      const email = session.user?.email;
      const type = session.user?.type;
      const provider = session.user?.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [router, loading, session, dispatch, user]);

  const logoutHandler = () => {
    signOut();
    dispatch(logout());
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Tabs session={session} />
        </>
      )}
    </>
  );
};

import Layout from "../components/layout/Layout";
import Tabs from "../components/layout/Tabs";
Profile.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Profile;
