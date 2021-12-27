/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

const ProductImage = ({ product, showImage, setShowImage }: any) => {
  return (
    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
      <div className="mb-4">
        {/* <Image
          src={showImage}
          alt="product image"
          layout="responsive"
          height={100}
          width={100}
        /> */}
        <img src={showImage} alt="product image" />
      </div>
      <div className="flex items-center flex-wrap">
        {product.productImages.map((image: any) => {
          return (
            <div
              key={image}
              onClick={() => setShowImage(image)}
              className="ml-2 p-1 border-2 text-center border-gray-300 hover:border-red-400 focus:outline-none cursor-pointer"
            >
              <div className="h-10 w-10">
                {/* <Image
                  src={image}
                  alt={product.title}
                  width={100}
                  height={100}
                  layout="responsive"
                /> */}
                <img src={image} alt={product.title} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductImage;
