import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUser, getUser } from "../utils/redux/userSlice";
import { useSession } from "next-auth/client";

import Loading from "../components/Loading";
import styles from "../styles/screens/Wishlist.module.scss";

const Wishlist = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!loading && !session)
      router.push({
        pathname: "/login/[message]",
        query: { message: "login_to_view_wishlist" },
      });
    if (session) {
      const email = session.user?.email;
      const type = session.user?.type;
      const provider = session.user?.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [router, loading, session, dispatch, user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        session && (
          <>
            <div onClick={() => router.back()}>Go back.</div>
            <div className={styles.wishlist}>
              <div className={styles.title}>Wishlist</div>
            </div>
          </>
        )
      )}
    </>
  );
};

import Layout from "../components/layout/Layout";
Wishlist.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Wishlist;
