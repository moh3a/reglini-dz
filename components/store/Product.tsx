import Link from "next/link";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/outline";

const Product = ({ product }: any) => {
  return (
    <div>
      {/* <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          className="w-full h-full object-center object-cover group-hover:opacity-75 "
        /> */}
      <div className="relative w-50 aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden z-0">
        <HeartIcon
          className="w-10 hover:text-red-500 cursor-pointer"
          aria-hidden="true"
        />
        <ShoppingCartIcon
          className="h-10 hover:text-green-500 cursor-pointer"
          aria-hidden="true"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">
        <Link href={product.href}>{product.name}</Link>
      </h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
    </div>
  );
};

export default Product;
