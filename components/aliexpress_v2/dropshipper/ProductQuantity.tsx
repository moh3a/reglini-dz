import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { IDSProductDetails } from "../../../utils/AETypes";

const ProductQuantity = ({
  product,
  quantity,
  setQuantity,
}: {
  product: IDSProductDetails;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) => {
  const router = useRouter();
  const t = useTranslations("AEProduct");
  const stock = product.total_available_stock;

  return (
    <div
      className={`mt-4 ${router.locale === "ar" && "flex flex-row-reverse"}`}
    >
      <div>{t("quantity")}</div>
      {stock && (
        <div className={`flex ${router.locale === "ar" && "flex-row-reverse"}`}>
          <input
            type="number"
            disabled={stock < 1}
            min="1"
            max={stock}
            step="1"
            id="quantity"
            name="quantity"
            value={stock < 1 ? 0 : Math.round(quantity)}
            onChange={(e: any) => setQuantity(parseInt(e.target.value))}
            className="p-1 mr-4 text-center dark:text-black w-20 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <span className={`text-gray-400 ${router.locale === "ar" && "mr-4"}`}>
            {stock && stock > 0 ? (
              <>
                {stock} {product.base_unit} {t("available")}
              </>
            ) : (
              <span className="text-red-600">{t("outOfStock")}</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductQuantity;
