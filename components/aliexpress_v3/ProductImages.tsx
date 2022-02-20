/* eslint-disable @next/next/no-img-element */

import { Dispatch, SetStateAction } from "react";
import { IDropshipperProductDetails } from "../../types/AETypes";

const ProductImages = ({
  product,
  showImage,
  setShowImage,
}: {
  product: IDropshipperProductDetails["result"];
  showImage: string;
  setShowImage: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
      <div className="mb-4">
        <img src={showImage} alt="product image" />
      </div>
      <div className="flex items-center flex-wrap">
        {product.image_u_r_ls?.split(";").map((image: string) => {
          return (
            <div
              key={image}
              onClick={() => setShowImage(image)}
              className="ml-2 p-1 border-2 text-center border-gray-300 hover:border-red-400 focus:outline-none cursor-pointer"
            >
              <div className="h-10 w-10">
                <img className="h-10 w-10" src={image} alt={product.subject} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductImages;
