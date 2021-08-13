import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import { signIn, signOut, getSession } from "next-auth/client";

// import connectDB from "../config/db";
import dbConnect from "../config/db";

import { getProducts, selectProducts } from "../utils/redux/productsSlice";
import { selectUser, getUser } from "../utils/redux/userSlice";
import { IProduct } from "../types/productType";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

import styles from "../styles/screens/HomeScreen.module.scss";
import LogoMini from "../components/layout/LogoMini";
import ProductCard from "../components/ProductCard";

const HomeScreen = ({ session }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const [session, loading] = useSession();
  const user = useSelector(selectUser);
  const { products, status, error } = useSelector(selectProducts);

  // TEMPORARY FOR LOGGING OUT WHEN CLOSING WINDOW
  if (typeof window !== "undefined") {
    window.onclose = () => {
      localStorage.removeItem("authToken");
    };
  }

  //
  //
  //
  //
  //
  useEffect(() => {
    if (!user.isAuthenticated && session && user.status !== "loading") {
      const email = session.user.email;
      const type = session.user.type;
      const provider = session.user.provider || undefined;
      dispatch(getUser({ email, account: type, provider }));
    }
  }, [session, dispatch, user]);
  //
  //
  //
  //
  //
  useEffect(() => {
    if (status === "idle") dispatch(getProducts());
  }, [dispatch, status]);
  return (
    <>
      <div className={styles.homescreen}>
        <div className={styles.aliexpressmodule}>
          You can now get any product from{" "}
          <span className={styles.aliexpress}>AliExpress</span>,
          <button onClick={() => router.push("/aliexpress")}>Learn more</button>
        </div>

        <div className={styles.sessionmodule}>
          {!session && (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user?.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          )}
        </div>

        <div>
          <h2 className={styles.homescreenTitle}>Latest Products</h2>
          <div className={styles.homescreenProducts}>
            {status === "loading" ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              products.map((product: any) => (
                // <Product
                //   key={product._id}
                //   productId={product._id}
                //   slug={product.slug}
                //   name={product.name}
                //   // description={product.description}
                //   price={product.price}
                //   imageUrl={product.imageUrl}
                // />
                <ProductCard
                  key={product._id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                />
              ))
            )}
          </div>
        </div>
      </div>
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
