/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

import { IProductProperties } from "../../types/AETypes";

const ProductProperties = ({
  property,
  setShowImage,
  setProperties,
}: {
  property: IProductProperties;
  setShowImage: any;
  setProperties: any;
}) => {
  const router = useRouter();
  const t = useTranslations("AEProduct");
  const [selectedProperty, setSelectedProperty] = useState({
    selected: false,
    name: property.name,
    value: "",
  });

  useEffect(() => {
    if (setProperties) {
      setProperties((properties: any) => [
        ...properties,
        { name: selectedProperty.name, value: selectedProperty.value },
      ]);
    }
  }, [setProperties, selectedProperty]);

  const selectHandler = (value: any) => {
    if (selectedProperty.value === value) {
      setSelectedProperty({
        selected: false,
        name: property.name,
        value: "",
      });
    } else {
      setSelectedProperty({
        selected: true,
        name: property.name,
        value: value,
      });
    }
  };

  return (
    <div key={property.name} className="mt-4">
      <div className={`${router.locale === "ar" && "flex flex-row-reverse"}`}>
        {selectedProperty.value ? (
          <CheckCircleIcon
            className="h-5 w-5 inline text-green-500 mr-1"
            aria-hidden="true"
          />
        ) : (
          <ExclamationCircleIcon
            className="h-5 w-5 inline text-red-500 mr-1"
            aria-hidden="true"
          />
        )}
        <span>{property.name}</span> <span>:</span>{" "}
        <span>{selectedProperty.value}</span>
      </div>

      <div
        className={`flex ${
          router.locale === "ar" ? "justify-end" : "items-center"
        } flex-wrap`}
      >
        {property.values.map((value: any) => {
          return (
            <div
              onClick={() => selectHandler(value.name)}
              key={value.id}
              className={`${
                selectedProperty.value === value.name
                  ? "border-red-500"
                  : "border-gray-300"
              } ml-2 p-1 border-2 text-center hover:border-red-400 focus:outline-none cursor-pointer`}
            >
              {value.hasImage ? (
                <div
                  className="h-10 w-10"
                  onClick={() => setShowImage(value.imageUrl)}
                >
                  <img
                    className="h-10 w-10"
                    src={value.thumbnailImageUrl}
                    alt={value.name}
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

export default ProductProperties;
