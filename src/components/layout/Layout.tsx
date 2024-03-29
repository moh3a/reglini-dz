import { useEffect, ReactNode, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import Navigation from "./nav/Navigation";
import Footer from "./Footer";
import { IUser } from "../../types";
import { selectUser } from "../../utils/redux/userSlice";
import { getUser } from "../../utils/redux/userAsyncActions";
import {
  fetchCommission,
  fetchCurrencyRate,
  selectFinance,
} from "../../utils/redux/financeSlice";

export default function Layout({ children }: { children: ReactNode }) {
  const [session, loading]: [IUser | null, boolean] = useSession();
  const dispatch = useDispatch();
  const { isAuthenticated, status, user } = useSelector(selectUser);

  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (router.locale === "en") {
      setMessage("Loading...");
    } else if (router.locale === "fr") {
      setMessage("Chargement en cours...");
    } else if (router.locale === "ar") {
      setMessage("جاري تحميل");
    }
  }, [router.locale]);

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

  useEffect(() => {
    if (loading || status === "loading") {
      setPlaceholder(true);
    } else {
      setPlaceholder(false);
    }
  }, [loading, status]);

  const { rate, commission } = useSelector(selectFinance);

  useEffect(() => {
    if (!rate) dispatch(fetchCurrencyRate());
  }, [rate, dispatch]);

  useEffect(() => {
    if (!commission) dispatch(fetchCommission());
  }, [commission, dispatch]);

  return (
    <>
      <Navigation placeholder={placeholder} user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
