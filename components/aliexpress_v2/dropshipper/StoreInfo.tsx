import { IDSProductDetails } from "../../../utils/AETypes";

const StoreInfo = ({ product }: { product: IDSProductDetails }) => {
  return (
    <div className=" w-52 my-2 bg-gray-100 hover:bg-gray-200 dark:bg-grim shadow-lg overflow-hidden rounded-lg px-4 py-2">
      {product.store_info && (
        <a
          href={`https://aliexpress.com/store/${product.store_info.store_id}`}
          target="_blank"
          rel="noreferrer"
        >
          <h3 className="font-bold text-sm">Store Info</h3>
          <p className="text-gray-800 dark:text-gray-400 font-bold text-lg">
            {product.store_info.store_name}
          </p>
          <div className="text-xs">
            <p>
              Communication Rating: {product.store_info.communication_rating}
            </p>
            <p>
              Items as Described Rating:{" "}
              {product.store_info.item_as_descriped_rating}
            </p>
            <p>
              Shipping Speed Rating: {product.store_info.shipping_speed_rating}
            </p>
          </div>
        </a>
      )}
    </div>
  );
};
export default StoreInfo;
