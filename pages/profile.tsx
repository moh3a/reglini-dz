import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut, useSession } from "next-auth/client";

import { selectUser, logout, getUser } from "../utils/redux/userSlice";
import Loading from "../components/Loading";
import styles from "../styles/screens/Profile.module.scss";

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
      <div onClick={() => router.back()}>Go back.</div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {user.isAuthenticated ? (
            <div className={styles.profile}>
              <h1 className={styles.username}> {user.user.name} </h1>

              <div className={styles.userinfo}>
                <div>Username: {user.user.name}</div>
                <div>
                  Account: {user.user.account}{" "}
                  {user.user.account === "oauth" ? (
                    <span>, from {user.user.provider}</span>
                  ) : (
                    <></>
                  )}{" "}
                </div>
                <div>Email: {user.user.email}</div>
                <div>Role: {user.user.role}</div>
              </div>
              <div className={styles.btn}>
                <button onClick={logoutHandler}>Log out</button>
              </div>
            </div>
          ) : (
            <div>You have to log in to view the profile.</div>
          )}
        </>
      )}
    </>
  );
};

import Layout from "../components/layout/Layout";
Profile.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Profile;
