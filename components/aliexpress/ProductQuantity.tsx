const ProductQuantity = ({ product, quantity, setQuantity }: any) => {
  return (
    <div className="mt-4">
      <div>Quantity</div>
      <div className="flex">
        <input
          type="number"
          min="1"
          step="1"
          onKeyDown={(e) => e.preventDefault()}
          id="quantity"
          name="quantity"
          value={Math.round(quantity)}
          onChange={(e: any) => setQuantity(e.target.value)}
          className="p-1 mr-4 text-center w-20 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        <span className="text-gray-400">
          {product.totalStock} {product.unitNamePlural} available
        </span>
      </div>
    </div>
  );
};

export default ProductQuantity;
