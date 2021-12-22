import { useEffect, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/client";

import StoreNavigation from "./nav/StoreNavigation";
import Footer from "./Footer";
import Loading from "../layout/Loading";
import { IUser } from "../../utils/types";
import { selectUser } from "../../utils/redux/userSlice";
import { getUser } from "../../utils/redux/userAsyncActions";

export default function Layout({ children }: { children: ReactNode }) {
  const [session, loading]: [IUser | null, boolean] = useSession();
  const dispatch = useDispatch();
  const { isAuthenticated, status, user } = useSelector(selectUser);

  useEffect(() => {
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
  }, [session, dispatch, isAuthenticated, status]);

  if (loading || status === "loading") {
    return <Loading text="Loading..." />;
  }

  return (
    <>
      <StoreNavigation user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
