import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

import { IDropshipperProductDetails } from "../../types/AETypes";

const ProductQuantity = ({
  product,
  quantity,
  selectedVariation,
  setQuantity,
}: {
  product: IDropshipperProductDetails["result"];
  selectedVariation: any;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) => {
  const router = useRouter();
  const t = useTranslations("AEProduct");
  const [stock, setStock] = useState(product.total_available_stock);

  useEffect(() => {
    if (
      selectedVariation &&
      typeof selectedVariation.s_k_u_available_stock !== "undefined"
    ) {
      setStock(selectedVariation.s_k_u_available_stock);
    } else {
      setStock(product.total_available_stock);
    }
  }, [selectedVariation, product.total_available_stock]);

  return (
    <div
      className={`mt-4 ${router.locale === "ar" && "flex flex-row-reverse"}`}
    >
      <div>{t("quantity")}</div>
      <div className={`flex ${router.locale === "ar" && "flex-row-reverse"}`}>
        {stock ? (
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
        ) : (
          ""
        )}

        <span className={`text-gray-400 ${router.locale === "ar" && "mr-4"}`}>
          {stock && stock > 0 ? (
            <>
              <CheckCircleIcon
                className="h-5 w-5 inline text-green-500 mr-1"
                aria-hidden="true"
              />
              {stock} {product.base_unit} {t("available")}
            </>
          ) : (
            <>
              <ExclamationCircleIcon
                className="h-5 w-5 inline text-red-500 mr-1"
                aria-hidden="true"
              />
              <span className="text-red-600">{t("outOfStock")}</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default ProductQuantity;
