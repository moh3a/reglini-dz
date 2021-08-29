import Image from "next/image";
import { useState } from "react";

const ProductProperty = ({ property, setShowImage }: any) => {
  const [selectedProperty, setSelectedProperty] = useState({
    selected: false,
    name: "",
  });

  const selectHandler = (value: any) => {
    if (selectedProperty.name === value) {
      setSelectedProperty({
        selected: false,
        name: "",
      });
    } else {
      setSelectedProperty({
        selected: true,
        name: value,
      });
    }
  };

  return (
    <div key={property.name} className="mt-4">
      <div>
        {" "}
        {property.name} : {selectedProperty.name}{" "}
      </div>

      <div className="flex items-center flex-wrap">
        {property.values.map((value: any) => {
          return (
            <div
              onClick={() => selectHandler(value.name)}
              key={value.id}
              className={`${
                selectedProperty.name === value.name ? "border-red-500" : ""
              } ml-2 p-1 border-2 text-center border-gray-300 hover:border-red-400 focus:outline-none cursor-pointer`}
            >
              {value.hasImage ? (
                <div
                  className="h-10 w-10"
                  onClick={() => setShowImage(value.imageUrl)}
                >
                  <Image
                    src={value.thumbnailImageUrl}
                    alt={value.name}
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </div>
              ) : (
                value.name
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductProperty;
