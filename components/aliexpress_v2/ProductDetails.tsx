/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import parse from "html-react-parser";
import StoreInfo from "./StoreInfo";

const ProductDetails = ({ product, converter }: any) => {
  const t = useTranslations("Aliexpress");

  return (
    <div className="my-24">
      {product.ae_item_base_info_dto && (
        <div>
          <p>{product.ae_item_base_info_dto.subject}</p>
          <StoreInfo product={product} />
          <div className="hidden md:flex md:flex-col md:justify-center md:items-center">
            <h2 className="font-bold text-xl">Seller&apos;s Description</h2>
            <div className="hidden md:block md:max-w-screen-md md:overflow-hidden">
              {parse(product.ae_item_base_info_dto.detail)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
