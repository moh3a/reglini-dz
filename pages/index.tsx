import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Head from "next/head";
import { getSession } from "next-auth/client";

// import connectDB from "../config/db";
import dbConnect from "../config/db";

import { getProducts, selectProducts } from "../utils/redux/productsSlice";
import { selectUser, getUser } from "../utils/redux/userSlice";
import { IProduct } from "../types/productType";

import styles from "../styles/screens/HomeScreen.module.scss";
import Product from "../components/Product";
import SessionBanner from "../components/banners/SessionBanner";
import AliexpressBanner from "../components/banners/AliexpressBanner";
import ProductList from "../components/store/ProductList";

const HomeScreen = ({ session }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const { products, status, error } = useSelector(selectProducts);

  // TEMPORARY FOR LOGGING OUT WHEN CLOSING WINDOW
  if (typeof window !== "undefined") {
    window.onclose = () => {
      localStorage.removeItem("authToken");
    };
  }

  useEffect(() => {
    if (!user.isAuthenticated && session && user.status !== "loading") {
      const email = session.user.email;
      const type = session.user.type;
      const provider = session.user.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [session, dispatch, user]);

  useEffect(() => {
    if (status === "idle") dispatch(getProducts());
  }, [dispatch, status]);

  return (
    <>
      <Head>
        <title>reglini.dz</title>
        <meta name="description" content="reglini-dz.com homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AliexpressBanner />
      <SessionBanner session={session} />
      <ProductList />
      {/* <div className={styles.homescreen}>
        <div>
          <h2 className={styles.homescreenTitle}>Latest Products</h2>
          <div className={styles.homescreenProducts}>
            {status === "loading" ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              products.map((product: IProduct) => (
                <Product
                  key={product._id}
                  productId={product._id}
                  slug={product.slug}
                  name={product.name}
                  // description={product.description}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))
            )}
          </div>
        </div>
      </div> */}
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
HomeScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default HomeScreen;
