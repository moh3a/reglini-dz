import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { selectUser, getUser } from "../utils/redux/userSlice";
import { IAuth, ICartItem } from "../types/authType";

import Loading from "../components/Loading";
import CartItem from "../components/CartItem";
import styles from "../styles/screens/Cart.module.scss";
import {
  updateItemQuantity,
  removeItemFromCart,
} from "../utils/redux/cartAsyncActions";

const CartScreen = () => {
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
  //
  let cartItems: Array<ICartItem>;
  if (user.isAuthenticated) {
    cartItems = user.user.cart.cartItems;
  } else {
    cartItems = [];
  }
  //
  // const qtyChangeHandler = (
  //   productId: ICartItem["productId"],
  //   quantity: ICartItem["quantity"],
  //   token: IAuth["token"] = authtoken
  // ) => {
  //   dispatch(updateItemQuantity({ productId, quantity, token }));
  // };
  //
  // const removeFromCartHandler = (
  //   productId: ICartItem["productId"],
  //   token: IAuth["token"] = authtoken
  // ) => {
  //   dispatch(removeItemFromCart({ productId, token }));
  // };
  //
  const showFromStatus = () => {
    if (user.status === "loading") {
      return <Loading />;
    } else if (user.status === "failed") {
      return <h1>Something went wrong.</h1>;
    } else if (user.status === "complete") {
      return (
        <>
          <div className={styles.cartscreenLeft}>
            <h2>Shopping cart</h2>
            {cartItems.length === 0 ? (
              <div>
                Your cart is empty. <Link href="/">Go back</Link>.
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  qtyChangeHandler={"qtyChangeHandler"}
                  removeFromCartHandler={"removeFromCartHandler"}
                />
              ))
            )}
          </div>

          <div className={styles.cartscreenRight}>
            <div className={styles.cartscreenInfo}>
              <p>Subtotal ({user.user.cart.count}) items </p>
              <p>Price: {user.user.cart.subtotal.toFixed(2)} DZD</p>
            </div>
            <div>
              <button>Proceed to Checkout</button>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      <Link href="/" passHref>
        <p>Go home</p>
      </Link>
      <div className={styles.cartscreen}>{showFromStatus()}</div>
    </div>
  );
};

import Layout from "../components/layout/Layout";
CartScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default CartScreen;
