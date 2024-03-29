import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { useTranslations } from "next-intl";

import { IUser } from "../../types";
import { selectUser } from "../../utils/redux/userSlice";
import WishedItems from "../../components/store/WishedItems";

const Wishlist = ({ messages }: any) => {
  const t = useTranslations("Wishlist");
  const [wishlist, setWishlist] = useState([]);
  const [session, loading]: [IUser | null, boolean] = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, status, user } = useSelector(selectUser);

  useEffect(() => {
    if (!loading && !session && !isAuthenticated)
      router.push({
        pathname: "/auth/login/[message]",
        query: { message: "login_to_view_wishlist" },
      });
  }, [router, session, loading, dispatch, isAuthenticated, status]);

  useEffect(() => {
    if (user) {
      setWishlist(user.wishlist);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Your Wishlist | reglini-dz</title>
        <meta
          name="description"
          content="Add items you like to the wishlist so you'll find them whenever you need them."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session && (
        <div className="flex flex-col">
          <div
            className={`m-4 p-4 text-4xl ${
              router.locale === "ar" && "text-right"
            }`}
          >
            {t("yourWishlist")}
          </div>
          <div>
            {user && wishlist.length > 0 ? (
              <WishedItems wishlist={wishlist} />
            ) : (
              <div className="text-center py-32 text-4xl">
                <div>{t("emptyWishlist")}</div>
                <div className="text-gray-700 hover:underline cursor-pointer">
                  <Link href="/aliexpress">{t("continueShopping")}</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { messages: require(`../../../locales/${locale}.json`) },
  };
};

import Layout from "../../components/layout/Layout";
Wishlist.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Wishlist;
