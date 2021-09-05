const ProductPrice = ({ product, selectedVariation }: any) => {
  return (
    <>
      <div className="flex justify-center mt-6 title-font font-medium text-2xl text-gray-800 dark:text-gray-100">
        {product.hasSinglePrice ? (
          <>
            €{" "}
            {selectedVariation && selectedVariation.sku
              ? selectedVariation.price.app.originalPrice.value
              : product.price.app.originalPrice.value}
          </>
        ) : (
          <div className="bg-red-400 hover:bg-red-500 text-center font-bold text-gray-100 px-6 py-2">
            {selectedVariation && selectedVariation.sku ? (
              <>
                {selectedVariation.price.app.hasDiscount ? (
                  <>
                    <div>
                      € {selectedVariation.price.app.discountedPrice.value}
                    </div>
                    <div className="text-xs lg:text-sm">
                      <span className="line-through mr-4">
                        € {selectedVariation.price.app.originalPrice.value}
                      </span>{" "}
                      {selectedVariation.price.app.discountPercentage}% off
                    </div>
                  </>
                ) : (
                  <>€ {selectedVariation.price.app.originalPrice.value}</>
                )}
              </>
            ) : (
              <>
                {product.priceSummary.app.hasDiscount ? (
                  <>
                    <div>
                      € {product.priceSummary.app.discountedPrice.min.value} -{" "}
                      {product.priceSummary.app.discountedPrice.max.value}
                    </div>
                    <div className="text-xs lg:text-sm">
                      <span className="line-through mr-4">
                        € {product.priceSummary.app.originalPrice.min.value} -{" "}
                        {product.priceSummary.app.originalPrice.max.value}
                      </span>{" "}
                      {product.priceSummary.app.discountPercentage}% off
                    </div>
                  </>
                ) : (
                  <>
                    € {product.priceSummary.app.originalPrice.min.value} -{" "}
                    {product.priceSummary.app.originalPrice.max.value}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPrice;
