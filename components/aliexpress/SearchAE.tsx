import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  searchAEProductByName,
  getAEProductInfo,
} from "../../utils/redux/aeapiAsyncActions";

const SearchAE = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  let locale = "en";
  if (router.locale === "ar") {
    locale = "ar_MA";
  } else if (router.locale === "fr") {
    locale = "fr_FR";
  } else {
    locale = "en_US";
  }

  const getByIdQueryHandler = (e: any) => {
    e.preventDefault();
    if (url.includes("aliexpress.com/item/")) {
      const firstSplit = url.split("/item/");
      const secondSplit = firstSplit[1].split(".html");
      dispatch(getAEProductInfo({ id: secondSplit[0], locale }));
    } else if (url.includes("https://a.aliexpress.com/")) {
      const newurl = "https://" + url.split("https://")[1];
      console.log(newurl);
    } else {
      dispatch(searchAEProductByName(url));
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
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
  );
};
export default SearchAE;