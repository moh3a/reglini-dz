/* eslint-disable @next/next/no-img-element */

const ProductImage = ({ product, showImage, setShowImage }: any) => {
  return (
    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
      <div className="mb-4">
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
                <img className="h-10 w-10" src={image} alt={product.title} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductImage;
