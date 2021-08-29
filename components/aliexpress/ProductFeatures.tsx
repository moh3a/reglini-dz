import Image from "next/image";
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
                  key={attribute.name}
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
            <span className="text-gray-500 cursor-pointer">
              {product.sellerDetails.sellerDetailsUrl}
            </span>
          </Link>
        </div>
        {product.hasVariations && (
          <div>
            <h2 className="text-3xl my-16 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Variations of the product
            </h2>

            {product.variations.map((variation: any) => (
              <div
                key={variation.sku}
                className="border-2 hover:bg-gray-200 my-4"
              >
                {variation.stock ? (
                  <p className="text-green-500 px-4">
                    {variation.stock} in stock.
                  </p>
                ) : (
                  <p className="text-red-500 px-4">Out of Stock</p>
                )}
                <dl className="my-4 px-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                  {variation.properties.map((property: any) => (
                    <div
                      key={property.id}
                      className="border-t border-gray-200 pt-4"
                    >
                      <dt className="font-medium text-gray-900">
                        {property.name}
                      </dt>
                      <dd className="mt-2 text-sm text-gray-500">
                        {property.value.name}
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt className="font-medium text-gray-900">Price</dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {variation.price.app.discountPercentage ? (
                        <>
                          {variation.price.app.discountedPrice.display} with{" "}
                          {variation.price.app.discountPercentage}% discount
                          from {variation.price.app.originalPrice.display}
                        </>
                      ) : (
                        variation.price.app.originalPrice.display
                      )}
                    </dd>
                  </div>
                </dl>
                {variation.imageUrl ? (
                  <div>
                    <Image
                      src={variation.imageUrl}
                      alt={variation.sku}
                      layout="responsive"
                      width={50}
                      height={50}
                      className="bg-gray-100 rounded-lg"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
