import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { IDSapiProductDetails, IDSProductDetails } from "../../utils/AETypes";

const ProductShipping = ({
  product,
  setSelectedShipping,
  converter,
}: {
  product: IDSapiProductDetails["result"] | IDSProductDetails;
  setSelectedShipping: any;
  converter: (price: number) => number | undefined;
}) => {
  const router = useRouter();
  const t = useTranslations("AEProduct");
  const [selected, setSelected] = useState(
    product.aeop_freight_calculate_result_for_buyer_d_t_o_list
      .aeop_freight_calculate_result_for_buyer_dto[0]
  );
  useEffect(() => {
    if (selected) setSelectedShipping(selected);
  }, [selected, setSelectedShipping]);

  return (
    <div className={`text-left z-10 mt-4`}>
      {product.aeop_freight_calculate_result_for_buyer_d_t_o_list
        .aeop_freight_calculate_result_for_buyer_dto ? (
        <>
          <p
            className={`text-green-500 ${
              router.locale === "ar" && "text-right"
            }`}
          >
            {t("itemAvailable")}
          </p>
          <p
            className={`${
              router.locale === "ar" && "text-right flex flex-row-reverse"
            }`}
          >
            <span>{t("shippingCarriers")}</span>
            <span>:</span>
          </p>
          <div>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative h-12 w-full py-2 pl-3 pr-10 text-left text-black bg-white dark:text-yellow-100 dark:bg-black rounded-lg shadow-lg sm:text-sm">
                  <span className="block truncate">
                    {selected.service_name}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-black bg-white dark:text-yellow-100 dark:bg-grim dark:border dark:border-yellow-100 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm z-100">
                    {product.aeop_freight_calculate_result_for_buyer_d_t_o_list.aeop_freight_calculate_result_for_buyer_dto.map(
                      (carrier, carrierIdx) => (
                        <Listbox.Option
                          key={carrierIdx}
                          className={({ active }) =>
                            `${active ? "font-extrabold" : ""}
                          text-black dark:text-yellow-100 cursor-default select-none relative py-2 pl-10 pr-4`
                          }
                          value={carrier}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? "font-bold" : "font-normal"
                                } block truncate`}
                              >
                                {carrier.service_name}
                              </span>
                              <span className="text-xs">
                                {t("delieveredIn")}{" "}
                                {carrier.estimated_delivery_time}
                              </span>

                              {/* {carrier.hasTracking ? (
                                <span className="text-xs text-green-400 block truncate">
                                  {t("carrierHasTracking")}
                                </span>
                              ) : (
                                <span className="text-xs text-red-400 block truncate">
                                  {t("carrierDontHaveTracking")}
                                </span>
                              )} */}
                              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {converter(carrier.freight.cent / 100)}{" "}
                                {t("dzd")}
                              </span>
                              {selected ? (
                                <span
                                  className={`${
                                    active ? "text-amber-600" : "text-amber-600"
                                  }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      )
                    )}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <p className="relative text-xs pl-2 z-0">
            <span>
              {t("delieveredIn")} {selected.estimated_delivery_time}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              {converter(selected.freight.cent / 100)} {t("dzd")}
            </span>
          </p>
        </>
      ) : (
        <p className="text-red-500 uppercase">{t("itemNotAvailable")}</p>
      )}
    </div>
  );
};
export default ProductShipping;
