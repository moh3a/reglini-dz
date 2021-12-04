import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Link from "next/link";

export default function ProductFeatures({ product }: any) {
  const [attributes, setAttributes] = useState([
    { id: "", name: "", value: [""] },
  ]);

  useEffect(() => {
    let att: any[] = [];
    if (product.hasAttributes) {
      product.attributes.map((attribute: any) => {
        const index = att.findIndex((x: any) => x.id === attribute.id);
        if (index === -1) {
          att.push({
            id: attribute.id,
            name: attribute.name,
            value: [attribute.value.name],
          });
        } else {
          att[index].value.push(attribute.value.name);
        }
      });
      setAttributes(att);
    }
  }, [product]);

  return (
    <div className="border-t border-gray-600 dark:border-yellow-200 text-black dark:text-yellow-100 bg-white dark:bg-grim">
      <div className="max-w-2xl mx-auto py-24 px-4 ">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight  sm:text-4xl">
            Product Specifications
          </h2>

          <dl className="my-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {attributes &&
              attributes.map((attribute: any) => {
                return (
                  <div
                    key={attribute.id}
                    className="border-t border-gray-200 pt-4"
                  >
                    <dt className="font-medium ">{attribute.name}</dt>
                    <dd className="mt-2 text-sm text-gray-600 dark:text-white">
                      {attribute.value.map((va: any) => (
                        <p key={va}>{va}</p>
                      ))}
                    </dd>
                  </div>
                );
              })}
          </dl>
          <h2 className="text-3xl font-extrabold tracking-tight  sm:text-4xl">
            Seller Details
          </h2>
          <p className="mt-4 text-gray-600 dark:text-white">
            {product.sellerDetails.summary.contactPerson} from{" "}
            {product.sellerDetails.summary.country}
          </p>
          <Link href={product.sellerDetails.sellerDetailsUrl} passHref>
            <a target="_blank" className="text-gray-600 dark:text-white">
              {product.sellerDetails.sellerDetailsUrl}
            </a>
          </Link>
          <h2 className="text-3xl my-10 font-extrabold tracking-tight  sm:text-4xl">
            Seller&apos;s Product Description
          </h2>
          {product.htmlDescription && parse(product.htmlDescription)}
        </div>
      </div>
    </div>
  );
}
