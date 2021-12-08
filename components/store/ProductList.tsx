import Link from "next/link";
import Product from "./Product";

export default function ProductList({ search, session, url, converter }: any) {
  return (
    <div className="z-0 bg-pink-50 dark:bg-grim text-gray-900 dark:text-gray-100">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-extrabold">Search results</h1>
        {search.refiningSearchCategories &&
          search.refiningSearchCategories.name && (
            <>
              <h2 className="text-2xl font-bold">Aliexpress category</h2>
              <h2 className="text-xl font-bold">
                {search.refiningSearchCategories[0].name}
              </h2>
            </>
          )}

        <div className="grid mt-10 grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {search.items.map((item: any) => (
            <Product
              product={item}
              key={item.productId}
              session={session}
              converter={converter}
            />
          ))}
        </div>
        <div className="text-center my-4">
          <Link href={`https://www.aliexpress.com/wholesale?SearchText=${url}`}>
            <a target="_blank">
              <button className="text-2xl text-white border border-green-500 bg-green-400 py-1 px-3 shadow-md rounded-lg">
                For more results, you can look here
              </button>
            </a>
          </Link>
          <p>
            You can search for the product you like from aliexpress.com, once
            you find the item you would like to purchase, just copy/paste the
            item&apos;s URL into the search bar.
          </p>
        </div>
      </div>
    </div>
  );
}
