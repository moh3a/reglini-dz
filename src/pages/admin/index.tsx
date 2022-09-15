import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import AdminSidebar from "../../components/admin/AdminSidebar";
import { IUser } from "../../types";
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
      {user && user.role === "admin" && (
        <div className="flex">
          <AdminSidebar user={user} />
          <div className="ml-32 px-5 w-full">
            <h1 className="my-10 text-2xl font-bold">Welcome {user.name}.</h1>
            {router.asPath === "/admin" && (
              <div>
                <h2 className="text-xl">Tasks to do</h2>
                <p>- Orders in a route and filter paid and unpaid</p>
              </div>
            )}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminScreen;
