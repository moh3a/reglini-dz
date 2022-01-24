import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Product from "./Product";

export default function ProductList({ search, session, url, converter }: any) {
  const router = useRouter();
  const t = useTranslations("AEProduct");
  return (
    <div className="z-0 bg-pink-50 dark:bg-grim text-gray-900 dark:text-gray-100">
      <div
        className={`${
          router.locale === "ar" && "text-right"
        } max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}
      >
        <h1 className="text-2xl font-extrabold">{t("searchResults")}</h1>
        {search.refiningSearchCategories &&
          search.refiningSearchCategories.name && (
            <>
              <h2 className="text-2xl font-bold">{t("searchCategory")}</h2>
              <h2 className="text-xl font-bold">
                {search.refiningSearchCategories[0].name}
              </h2>
            </>
          )}

        <div className="my-4 grid mt-10 grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {search.items.map((item: any) => (
            <Product
              product={item}
              key={item.productId}
              session={session}
              converter={converter}
            />
          ))}
        </div>
        <div className="text-center mt-16 mb-6">
          <Link href={`https://www.aliexpress.com/wholesale?SearchText=${url}`}>
            <a target="_blank">
              <button className="text-2xl text-white border border-green-500 bg-green-400 py-1 px-3 shadow-md rounded-lg">
                {t("moreResults")}
              </button>
            </a>
          </Link>
          <p>{t("moreResultsDesc")}</p>
        </div>
      </div>
    </div>
  );
}
