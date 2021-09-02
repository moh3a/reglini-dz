import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
import Head from "next/head";
import { getSession } from "next-auth/client";

import dbConnect from "../config/db";
import { selectUser } from "../utils/redux/userSlice";
import { getUser } from "../utils/redux/userAsyncActions";
import WishedItems from "../components/store/WishedItems";
import Link from "next/link";

const Wishlist = ({ session }: any) => {
  const [wishlist, setWishlist] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, status, user } = useSelector(selectUser);

  useEffect(() => {
    if (!session)
      router.push({
        pathname: "/login/[message]",
        query: { message: "login_to_view_wishlist" },
      });
    if (!isAuthenticated && session && status !== "loading") {
      const email = session.user?.email;
      const type = session.user?.type;
      const provider = session.user?.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [router, session, dispatch, isAuthenticated, status]);

  useEffect(() => {
    if (user) {
      setWishlist(user.wishlist);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Your Wishlist | reglini.dz</title>
        <meta
          name="description"
          content="Add items you like to the wishlist so you'll find them whenever you need them."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session && (
        <div className="flex flex-col">
          <div className="m-4 p-4 text-4xl">Your wishlist</div>
          <div>
            {user && wishlist.length > 0 ? (
              <WishedItems wishlist={wishlist} />
            ) : (
              <div className="text-center p-8 text-lg">
                <div>You have no items in your wishlist.</div>
                <div className="text-gray-700 hover:underline cursor-pointer">
                  <Link href="/aliexpress">Continue shopping</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!mongoose.connection.readyState) {
    await dbConnect();
  }
  const { req, res } = context;
  const session = await getSession({ req });

  return {
    props: { session },
  };
};

import Layout from "../components/layout/Layout";
Wishlist.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Wishlist;
