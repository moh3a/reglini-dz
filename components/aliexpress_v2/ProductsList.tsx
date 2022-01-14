/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ProductsList = ({ products, converter }: any) => {
  const t = useTranslations("Aliexpress");
  const router = useRouter();

  return (
    <div className="my-8">
      <h1 className="text-2xl w-full text-center">
        Search results from AliExpress
      </h1>
      <div className="w-full flex flex-wrap justify-center items-center">
        {products.map((product: any) => (
          <div key={product.productId} className="my-8 mx-3 w-50 h-50">
            <Link href={`/aliexpress/product/${product.productId}`} passHref>
              <div className="flex justify-center items-center w-52 h-52 overflow-hidden bg-gray-200 cursor-pointer">
                <img
                  className="w-50 h-50 object-center object-cover hover:opacity-75 rounded-lg shadow-lg"
                  src={product.imageUrl}
                  alt=""
                />
              </div>
            </Link>
            <div>
              <div className="w-52">
                <h1 className="mt-2 text-sm h-5 overflow-hidden">
                  {product.productCategory}
                </h1>
                <p
                  className={`mt-1 text-lg font-medium ${
                    router.locale === "ar" && "flex flex-row-reverse"
                  }`}
                >
                  <span>{converter(product.price)}</span> <span>DZD</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductsList;
