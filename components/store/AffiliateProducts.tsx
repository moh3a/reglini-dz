/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function AffiliateProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<any>();
  const fetchProducts = useCallback(async () => {
    const { data } = await axios.post(
      "/api/aliexpress/affiliate/product/query"
    );
    setProducts(data.data);
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      {products && (
        <div className="my-8">
          <h1 className="text-2xl w-full text-center">
            Recommended by AliExpress
          </h1>
          <div className="flex overflow-x-auto">
            {products.map((product: any) => (
              <div key={product.productId} className="my-8 mx-3 w-50 h-50">
                <Link
                  href={`/aliexpress/product/${product.productId}`}
                  passHref
                >
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
                      <span>{product.price}</span> <span>€</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AffiliateProducts;
