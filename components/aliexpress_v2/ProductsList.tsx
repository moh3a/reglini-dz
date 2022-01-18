/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsVerticalIcon,
  ExternalLinkIcon,
  HeartIcon,
  TagIcon,
} from "@heroicons/react/outline";

import { IAffiliateProduct } from "../../utils/AETypes";

const ProductsList = ({
  products,
  converter,
}: {
  products: IAffiliateProduct[];
  converter: (price: number) => number | undefined;
}) => {
  const t = useTranslations("Aliexpress");
  const router = useRouter();

  return (
    <div className="my-8">
      {/* <h1 className="text-2xl w-full text-center">
        Search results from AliExpress
      </h1> */}

      <div className="w-full flex flex-wrap justify-center items-center">
        {products.map((product: IAffiliateProduct) => (
          <div key={product.product_id} className="my-8 mx-2 w-50 h-50">
            <Link
              href={`/aliexpress_v2/product/${product.product_id}`}
              passHref
            >
              <div className="flex justify-center items-center w-36 h-36 md:w-52 md:h-52 overflow-hidden bg-gray-200 cursor-pointer">
                <img
                  className="w-50 h-50 object-center object-cover hover:opacity-75 rounded-lg shadow-lg"
                  src={product.product_main_image_url}
                  alt={product.product_title}
                />
              </div>
            </Link>
            <div className="flex justify-between">
              <div className="w-32 md:w-44">
                <h1 className="mt-2 text-sm h-5 overflow-hidden">
                  {product.second_level_category_name
                    ? product.second_level_category_name
                    : product.first_level_category_name}
                </h1>
                {product.target_app_sale_price && (
                  <p
                    className={`mt-1 text-lg font-medium ${
                      router.locale === "ar" && "flex flex-row-reverse"
                    }`}
                  >
                    <span>
                      {converter(Number(product.target_app_sale_price))}
                    </span>{" "}
                    <span>DZD</span>
                  </p>
                )}
              </div>
              {/* <div className="relative top-2 w-6 h-6 cursor-pointer">
                <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </div> */}
              <div>
                <Menu as="div" className="relative z-100">
                  <div>
                    <Menu.Button className="h-6 w-6 cursor-pointer relative top-2">
                      <DotsVerticalIcon
                        className="w-6 h-6"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-1 w-40 md:w-52 mt-2 bg-gray-100 dark:bg-grim divide-y divide-gray-100 rounded-lg shadow-md">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                router.push(
                                  `/aliexpress/product/${product.product_id}`
                                )
                              }
                              className={`${
                                active && "bg-gray-200 dark:bg-gray-600"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <TagIcon
                                className="w-5 h-5 inline mr-1"
                                aria-hidden="true"
                              />
                              Open here
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href={product.promotion_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <button
                                className={`${
                                  active && "bg-gray-200 dark:bg-gray-600"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              >
                                <img
                                  className="h-5 w-5 mr-1"
                                  src="/aliexpress-icon.png"
                                  alt="aliexpress logo"
                                />
                                Open on AliExpress
                                <ExternalLinkIcon
                                  className="w-5 h-5 inline ml-1"
                                  aria-hidden="true"
                                />
                              </button>
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active && "bg-gray-200 dark:bg-gray-600"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <HeartIcon
                                className="text-red-500 w-5 h-5 inline mr-1"
                                aria-hidden="true"
                              />{" "}
                              Add to Favorites
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
