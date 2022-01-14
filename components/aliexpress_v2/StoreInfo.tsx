const StoreInfo = ({ product }: any) => {
  return (
    <div className="mx-3 w-52 my-2 bg-gray-100 hover:bg-gray-200 overflow-hidden rounded-lg px-4 py-2">
      <a
        href={`https://aliexpress.com/store/${product.ae_store_info.store_id}`}
      >
        <h3 className="font-bold text-sm">Store Info</h3>
        <p className="text-gray-800 font-bold text-lg">
          {product.ae_store_info.store_name}
        </p>
        <div className="text-xs">
          <p>
            Communication Rating: {product.ae_store_info.communication_rating}
          </p>
          <p>
            Items as Described Rating:{" "}
            {product.ae_store_info.item_as_described_rating}
          </p>
          <p>
            Shipping Speed Rating: {product.ae_store_info.shipping_speed_rating}
          </p>
        </div>
      </a>
    </div>
  );
};
export default StoreInfo;
