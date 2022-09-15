/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import slugify from "slugify";
import { SearchIcon } from "@heroicons/react/outline";

const MiniSearchAE = () => {
  const [newquery, setNewQuery] = useState("");
  const t = useTranslations("Aliexpress");
  const router = useRouter();

  const aeQueryHandler = async (e: any) => {
    e.preventDefault();
    if (newquery.includes("aliexpress.com/item/")) {
      const firstSplit = newquery.split("/item/");
      const secondSplit = firstSplit[1].split(".html");
      router.push(`/aliexpress/product/${secondSplit[0]}`);
    } else {
      const slugged = slugify(newquery);
      router.push(`/aliexpress/search/${slugged}`);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-grim">
      <div className="container flex flex-col px-5 py-8 mx-auto lg:items-center">
        <div className="flex flex-col w-full mb-4 text-left lg:text-center">
          <div className="flex justify-center items-center">
            <img src="/aliexpress-ar21.svg" alt="aliexpress logo" />
          </div>
          <form
            onSubmit={aeQueryHandler}
            className={`flex ${
              router.locale === "ar" ? "md:flex-row-reverse" : "md:flex-row"
            }  items-center mt-8 lg:mx-auto justify-center lg:w-1/2`}
          >
            <input
              className={`${
                router.locale === "ar" && "text-right"
              } w-full px-4 py-2 border border-gray-400 text-black transition duration-650 ease-in-out transform bg-gray-200 focus:outline-none focus:border-red-500 md:mb-0 focus:ring-0`}
              type="text"
              id="url"
              name="url"
              placeholder="exemple: watch, xt91, coat ... or https://www.aliexpress.com/item/xxxxxxx"
              autoComplete="off"
              value={newquery}
              onChange={(e) => setNewQuery(e.target.value)}
            />
            <button
              className="p-2 border border-gray-400 bg-aliexpress text-white"
              type="submit"
            >
              <SearchIcon className="h-5 w-5 inline" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MiniSearchAE;
