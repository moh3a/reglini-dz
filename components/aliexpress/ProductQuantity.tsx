const ProductQuantity = ({
  product,
  quantity,
  setQuantity,
  selectedVariation,
}: any) => {
  const stock =
    selectedVariation && selectedVariation.sku
      ? selectedVariation.stock
      : product.totalStock;

  return (
    <div className="mt-4">
      <div>Quantity</div>
      <div className="flex">
        <input
          type="number"
          disabled={stock < 1}
          min="1"
          max={stock}
          step="1"
          onKeyDown={(e) => e.preventDefault()}
          id="quantity"
          name="quantity"
          value={stock < 1 ? 0 : Math.round(quantity)}
          onChange={(e: any) => setQuantity(parseInt(e.target.value))}
          className="p-1 mr-4 text-center dark:text-black w-20 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        <span className="text-gray-400">
          {stock > 0 ? (
            <>
              {stock} {product.unitNamePlural} available
            </>
          ) : (
            <span className="text-red-600">Out Of Stock</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default ProductQuantity;
