import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
import { getSession } from "next-auth/client";

import dbConnect from "../../config/db";

import { selectAEApi } from "../../utils/redux/aeapiSlice";
import {
  searchAEProductByName,
  searchAEProductByCategory,
  getAEProductInfo,
} from "../../utils/redux/aeapiAsyncActions";
import { categories } from "../../data/AliExpressCategories";

import ProductDetails from "../../components/store/ProductDetails";
import ProductList from "../../components/store/ProductList";
import DangerDialog from "../../components/elements/DangerDialog";

const Aliexpress = ({ session }: any) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { search, product } = useSelector(selectAEApi);

  useEffect(() => {
    if (!search) {
      dispatch(
        searchAEProductByCategory(
          categories[Math.round(Math.random() * (100 / 3.5))].id
        )
      );
    }
  }, [search, dispatch]);

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
    <>
      <section className="bg-gray-100 dark:bg-gray-900">
        {error && <DangerDialog>{error}</DangerDialog>}
        <div className="container flex flex-col px-5 py-8 mx-auto lg:items-center">
          <div className="flex flex-col w-full mb-8 text-left lg:text-center">
            <h2 className="mb-4 text-xs font-semibold tracking-widest text-center uppercase title-font">
              Here starts everything.
            </h2>
            <h1 className="mx-auto mb-6 text-4xl text-center font-semibold leading-none tracking-tighter text-aliexpress lg:w-1/2 lg:text-6xl title-font">
              Did you find something you like?
            </h1>
            <p className="mx-auto text-base text-center lg:text-lg font-medium leading-relaxed text-blueGray-700 lg:w-2/3">
              You can browse Aliexpress webapp or mobile app, and whenever you
              find an item that you like, you can simply paste the URL here, and
              we&apos;ll take care of the rest.
            </p>
            <form
              onSubmit={getByIdQueryHandler}
              className="flex flex-col md:flex-row items-center mt-12 lg:mx-auto justify-center lg:w-1/2"
            >
              <div className="relative w-2/4 mr-4 text-left lg:w-full xl:w-1/2 md:w-full">
                <input
                  className="flex-grow w-full px-4 py-2 mb-4 mr-4 text-base text-black transition duration-650 ease-in-out transform rounded-lg bg-gray-200 focus:outline-none focus:border-red-500 md:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 focus:ring-red-500 ring-offset-current ring-offset-2"
                  type="text"
                  id="url"
                  name="url"
                  placeholder="https://www.aliexpress.com/item/xxxxxxx"
                  autoComplete="off"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button
                className="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-aliexpress rounded-lg hover:opacity-60 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                type="submit"
              >
                Find
              </button>
            </form>
            <p className="mt-2 mb-8 text-xs lg:text-sm text-center lg:mx-auto lg:w-1/3 ">
              Happy shopping!
            </p>
          </div>
        </div>
      </section>
      {product && <ProductDetails session={session} product={product} />}
      {search && <ProductList session={session} search={search} />}
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

import Layout from "../../components/layout/Layout";
Aliexpress.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Aliexpress;
