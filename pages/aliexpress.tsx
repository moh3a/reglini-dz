import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import slugify from "slugify";

import { selectAEApi } from "../utils/redux/aeapiSlice";
import {
  searchAEProductByName,
  getAEProductInfo,
} from "../utils/redux/aeapiAsyncActions";

import styles from "../styles/screens/Aliexpress.module.scss";

const Aliexpress = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const { search, product } = useSelector(selectAEApi);

  const getByIdQueryHandler = (e: any) => {
    e.preventDefault();
    if (url.includes("aliexpress.com/item/")) {
      const firstSplit = url.split("/item/");
      const secondSplit = firstSplit[1].split(".html");
      dispatch(getAEProductInfo(secondSplit[0]));
    } else {
      setError("The URL you entered is invalid !");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const searchByNameQueryHandler = (e: any) => {
    e.preventDefault();
    dispatch(searchAEProductByName(name));
  };

  return (
    <div className={styles.productcontainer}>
      <div className={styles.desc}>
        Are you browsing <span className={styles.aliexpress}> AliExpress </span>
        from the web browser or the mobile app?
      </div>
      <div className={styles.options}>
        <div
          className={styles.option}
          onClick={() => router.push("/aliexpress/search_browser")}
        >
          Web Browser
        </div>
        <div
          className={styles.option}
          onClick={() => router.push("/aliexpress/search_mobile")}
        >
          Mobile App
        </div>
      </div>

      <div className={styles.productcontainer}>
        <div onClick={() => router.back()}>Go back.</div>
        {/* FROM MOBILE APP */}
        <h2>
          <span className={styles.aliexpress}>AliExpress</span> Mobile App
        </h2>
        <div className={styles.desc}>
          Since you are browsing the{" "}
          <span className={styles.aliexpress}>AliExpress</span> mobile app, you
          can get the product you want to purchase simply by selecting the
          product and copying its name.
        </div>
        <div className={styles.fromMobileApp}>
          <form
            onSubmit={searchByNameQueryHandler}
            className={styles.formgroup}
          >
            <label className={styles.hidden} htmlFor="productId">
              Enter AliExpress product name:{" "}
            </label>
            <input
              type="text"
              required
              id="name"
              autoComplete="off"
              placeholder="Enter-name-here..."
              value={name}
              onChange={(e) => setName(slugify(e.target.value))}
            />
          </form>
          {search ? (
            search.totalCount === 0 ? (
              <div className={styles.product}>
                No results for what you are looking for.
              </div>
            ) : (
              <div className={styles.product}>
                The product ID of the most prominent result is{" "}
                {search.items[0].productId}
              </div>
            )
          ) : (
            <div className={styles.product}>
              Waiting for you to look up some products!
            </div>
          )}
        </div>
      </div>

      <div className={styles.productcontainer}>
        <div onClick={() => router.back()}>Go back.</div>
        {/* FROM BROWSER */}
        <h2>
          <span className={styles.aliexpress}>AliExpress</span> Web App
        </h2>
        <div className={styles.desc}>
          Since you are browsing the{" "}
          <span className={styles.aliexpress}>AliExpress</span> web app, you can
          get the product you want to purchase simply by selecting the product
          and copying its URL address.
        </div>
        <div className={styles.fromBrowser}>
          {/* error */}
          {error && <div className={styles.errormessage}> {error} </div>}
          <form onSubmit={getByIdQueryHandler} className={styles.formgroup}>
            <label className={styles.hidden} htmlFor="productId">
              Enter AliExpress product URL:{" "}
            </label>
            <input
              type="text"
              required
              id="productId"
              placeholder="https://www.aliexpress.com/item/xxxxxxxxxxx"
              value={url}
              autoComplete="off"
              onChange={(e) => setUrl(e.target.value)}
            />
          </form>
          {product ? (
            product.status === "productNotFound" ? (
              <div className={styles.product}>
                The product you are looking for doesn&apos;t exist.
              </div>
            ) : (
              <div className={styles.product}>
                The title of your product is {product.title}
              </div>
            )
          ) : (
            <div className={styles.product}>
              Waiting for you to look up some products!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import Layout from "../components/layout/Layout";
Aliexpress.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Aliexpress;
