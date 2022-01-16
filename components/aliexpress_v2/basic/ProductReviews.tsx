import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { IDSapiProductDetails } from "../../../utils/AETypes";

const ProductReviews = ({
  product,
}: {
  product: IDSapiProductDetails["result"];
}) => {
  const router = useRouter();
  const t = useTranslations("AEProduct");

  return (
    <div className={`flex ${router.locale === "ar" && "justify-end"} mb-4`}>
      <span
        className={`flex ${
          router.locale === "ar" ? " flex-row-reverse" : ""
        } items-center `}
      >
        {product.ae_item_base_info_dto && (
          <>
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
              {product.ae_item_base_info_dto.avg_evaluation_rating}
            </span>
            <span
              className={`text-gray-800 dark:text-gray-100 mx-4 ${
                router.locale === "ar" && "flex flex-row-reverse "
              }`}
            >
              <span>{product.ae_item_base_info_dto.evaluation_count}</span>{" "}
              <span className="mr-1">{t("reviews")}</span>
            </span>
          </>
        )}
      </span>
    </div>
  );
};
export default ProductReviews;
