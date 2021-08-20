import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { selectUser } from "../../utils/redux/userSlice";
import { getProduct, selectProduct } from "../../utils/redux/productSlice";
import { addItemToCart } from "../../utils/redux/cartAsyncActions";

import styles from "../../styles/screens/ProductScreen.module.scss";

const ProductScreen = ({}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, token } = useSelector(selectUser);
  const {
    _id,
    name,
    description,
    price,
    countInStock,
    imageUrl,
    status,
    error,
  } = useSelector(selectProduct);

  const { slug } = router.query;
  const authtoken = token;

  useEffect(() => {
    if (slug) {
      dispatch(getProduct(slug));
    }
  }, [dispatch, slug]);

  const addToCartHandler = () => {
    dispatch(
      addItemToCart({
        _id,
        name,
        slug,
        price,
        countInStock,
        imageUrl,
        quantity,
        token: authtoken,
      })
    );
    router.push("/cart");
  };

  return (
    //<ProductDetails />
    <div className={styles.productscreen}>
      <div>
        <Link href="/">
          <a>Go back home.</a>
        </Link>
      </div>
      {status === "loading" ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className={styles.productscreenLeft}>
            <div className={styles.leftImage}>
              {/* <Image src={imageUrl} alt={name} /> */}
            </div>
            <div className={styles.leftInfo}>
              <p className={styles.leftName}>{name}</p>
              <p className={styles.leftPrice}>Price: {price} DZD</p>
              <p className={styles.leftDescription}>
                Description: {description}{" "}
              </p>
            </div>
          </div>

          <div className={styles.productscreenRight}>
            <div className={styles.rightInfo}>
              <p>
                Price: <span>{price} DZD</span>
              </p>
              <p>
                Status:{" "}
                <span>{countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
              </p>
              <p>
                Quantity:
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                  {[...Array(countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <div>
                {isAuthenticated ? (
                  <button type="button" onClick={addToCartHandler}>
                    Add to cart
                  </button>
                ) : (
                  <>
                    <div>You must login to add to cart.</div>
                    <Link href="/login" passHref>
                      <button type="button">Login</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

import Layout from "../../components/layout/Layout";
ProductScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ProductScreen;
