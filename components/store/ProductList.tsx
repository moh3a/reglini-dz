import Product from "./Product";

export default function ProductList({ search, session }: any) {
  return (
    <div className="z-0 bg-pink-50 dark:bg-grim text-gray-900 dark:text-gray-100">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold">Aliexpress category</h2>

        <h2 className="text-xl font-bold">
          {search.refiningSearchCategories[0].name}
        </h2>

        <div className="grid mt-10 grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {search.items.map((item: any) => (
            <Product product={item} key={item.productId} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
}
