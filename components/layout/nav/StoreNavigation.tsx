import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useSession } from "next-auth/client";

import Logo from "../Logo";
import NavSmall from "./NavSmall";
import NavLarge from "./NavLarge";
import { IUser } from "../../../types/userType";
import { selectUser } from "../../../utils/redux/userSlice";
import { getUser } from "../../../utils/redux/userAsyncActions";

export default function StoreNavigation() {
  const [session, loading]: [IUser | null, boolean] = useSession();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, status, user } = useSelector(selectUser);

  useEffect(() => {
    if (!isAuthenticated && session && status !== "loading") {
      const email = session.user?.email;
      const type = session.user?.type;
      const provider = session.user?.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [session, dispatch, isAuthenticated, status]);

  return (
    <>
      {loading ? (
        <div className="pb-4 bg-white dark:bg-grim w-full z-0 flex justify-center">
          <Link href="/" passHref>
            <a>
              <span className="sr-only">reglini.dz</span>
              <Logo width="50" height="50" />
            </a>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-grim z-0">
          <NavSmall
            open={open}
            setOpen={setOpen}
            session={session}
            user={user}
          />
          <NavLarge
            open={open}
            setOpen={setOpen}
            session={session}
            user={user}
          />
        </div>
      )}
    </>
  );
}
