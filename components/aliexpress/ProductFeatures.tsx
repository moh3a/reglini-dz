import parse from "html-react-parser";
import Link from "next/link";

export default function ProductFeatures({ product }: any) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-24 px-4 ">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Product Specifications
          </h2>

          <dl className="my-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {product.hasAttributes &&
              product.attributes.map((attribute: any) => (
                <div
                  key={attribute.id}
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">
                    {attribute.name}
                  </dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {attribute.value.name}
                  </dd>
                </div>
              ))}
          </dl>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Seller Details
          </h2>
          <p className="mt-4 text-gray-500">
            {product.sellerDetails.summary.contactPerson} from{" "}
            {product.sellerDetails.summary.country}
          </p>
          <Link href={product.sellerDetails.sellerDetailsUrl} passHref>
            <a target="_blank" className="text-gray-500">
              {product.sellerDetails.sellerDetailsUrl}
            </a>
          </Link>
          <h2 className="text-3xl my-10 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Seller&apos;s Product Description
          </h2>
          {parse(product.htmlDescription)}
        </div>
      </div>
    </div>
  );
}
