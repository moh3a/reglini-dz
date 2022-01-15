/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Link from "next/link";
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
      <h1 className="text-2xl w-full text-center">
        Search results from AliExpress
      </h1>
      <div className="w-full flex flex-wrap justify-center items-center">
        {products.map((product: IAffiliateProduct) => (
          <div key={product.product_id} className="my-8 mx-3 w-50 h-50">
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
            <div>
              <div className="w-36 md:w-52">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
