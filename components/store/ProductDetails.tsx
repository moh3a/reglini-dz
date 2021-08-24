import Image from "next/image";

const ProductDetails = ({ product }: any) => {
  return (
    <section className="bg-red-50 dark:bg-red-900 text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full object-cover object-center rounded overflow-hidden">
            <Image
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              alt={product.title}
              src={product.productImages[0]}
              height={100}
              width={100}
              layout="responsive"
            />
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-700 dark:text-gray-200 tracking-widest">
              {product.attributes[0].value.name}
            </h2>
            <h1 className="text-gray-800 dark:text-gray-100 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>
            <div className="flex mb-4">
              {product.reviewsRatings.averageRating && (
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-aliexpress"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-800 dark:text-gray-100 ml-1">
                    {product.reviewsRatings.averageRating}
                  </span>
                  <span className="text-gray-800 dark:text-gray-100 ml-4">
                    {product.reviewsRatings.totalCount} Reviews
                  </span>
                  <span className="text-gray-800 dark:text-gray-100 ml-4">
                    {product.totalOrders} Orders
                  </span>
                </span>
              )}
            </div>
            <p className="leading-relaxed text-gray-800 dark:text-gray-100">
              Category: {product.productCategory.name}
            </p>
            <div className="mt-6 text-gray-800 dark:text-gray-100 pb-5 mb-5">
              {product.properties.map((property: any) => {
                return (
                  <div key={property.name} className="mt-4">
                    <div> {property.name} </div>
                    <div className="flex items-center flex-wrap">
                      {property.values.map((value: any) => {
                        return (
                          <div
                            key={value.id}
                            className="ml-2 p-1 border-2 text-center border-gray-300 hover:border-red-400 focus:outline-none cursor-pointer"
                          >
                            {value.hasImage ? (
                              <div className="h-10 w-10">
                                <Image
                                  src={value.thumbnailImageUrl}
                                  alt={value.name}
                                  width={100}
                                  height={100}
                                  layout="responsive"
                                />
                              </div>
                            ) : (
                              value.name
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <div className="mt-4">
                <div>Quantity</div>
                <div className="flex">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={1}
                    className="p-1 mr-4 text-center w-20 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <span className="text-gray-400">
                    {product.totalStock} {product.unitNamePlural} available
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 title-font font-medium text-2xl text-gray-800 dark:text-gray-100">
              {product.priceSummary ? (
                <div className="bg-red-400 hover:bg-red-500 text-center font-bold text-gray-100 px-6 py-2">
                  <div>
                    $ {product.priceSummary.app.discountedPrice.min.value} -{" "}
                    {product.priceSummary.app.discountedPrice.max.value}
                  </div>
                  <div className="text-xs lg:text-sm">
                    <span className="line-through mr-4">
                      $ {product.priceSummary.app.originalPrice.min.value} -{" "}
                      {product.priceSummary.app.originalPrice.max.value}
                    </span>{" "}
                    {product.priceSummary.app.discountPercentage}% off
                  </div>
                </div>
              ) : (
                <>$ {product.price.app.originalPrice.value}</>
              )}
            </div>
            <div className="mt-4 flex">
              <button className="flex ml-auto text-white bg-aliexpress border-0 py-2 px-6 focus:outline-none hover:opacity-60 rounded">
                Buy
              </button>
              <button className="flex ml-4 text-white bg-aliexpress border-0 py-2 px-6 focus:outline-none hover:opacity-60 rounded">
                Cart
              </button>
              <button className="rounded-full hover:bg-aliexpress w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:text-gray-100 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5 "
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
