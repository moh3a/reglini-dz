import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const ProductProperty = ({ property, setShowImage, setProperties }: any) => {
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
    <>
      {property.id === "200007763" ? (
        <div key={property.name} className="mt-4">
          <div
            className={`${router.locale === "ar" && "flex flex-row-reverse"}`}
          >
            <span>{property.name}</span>
            <span>:</span>
            <span>{selectedProperty.value}</span>
          </div>

          <div
            className={`flex ${
              router.locale === "ar" ? "justify-end" : "items-center"
            }  flex-wrap`}
          >
            {property.values.map((value: any) => {
              if (value.countryCode === "CN") {
                return (
                  <div
                    onClick={() => selectHandler(value.name)}
                    key={value.id}
                    className={`${
                      selectedProperty.value === value.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } ml-2 p-1 border-2 text-center  hover:border-red-400 focus:outline-none cursor-pointer`}
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
              } else {
                return (
                  <div
                    key={value.id}
                    className={`ml-2 p-1 border-2 text-center border-gray-100 text-gray-400 bg-gray-200 focus:outline-none cursor-not-allowed`}
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
              }
            })}
          </div>
          <div>
            <small>{t("shipFromChina")}</small>
          </div>
        </div>
      ) : (
        <div key={property.name} className="mt-4">
          <div
            className={`${router.locale === "ar" && "flex flex-row-reverse"}`}
          >
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
      )}
    </>
  );
};

export default ProductProperty;
