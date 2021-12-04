import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const ProductShipping = ({ product, setSelectedShipping }: any) => {
  const [selected, setSelected] = useState(product.shipping.carriers[0]);
  useEffect(() => {
    if (selected) setSelectedShipping(selected);
  }, [selected, setSelectedShipping]);

  return (
    <div className="z-10 mt-4">
      {product.shipping.isAvailableForSelectedCountries ? (
        <>
          <p className="text-green-500">
            Item is avaible for shipping from China
          </p>
          <p>Shipping Carriers: </p>
          <div>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative h-12 w-full py-2 pl-3 pr-10 text-left text-black bg-white dark:text-yellow-100 dark:bg-black rounded-lg shadow-lg sm:text-sm">
                  <span className="block truncate">
                    {selected.company.name}
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
                    {product.shipping.carriers.map(
                      (carrier: any, carrierIdx: number) => (
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
                                {carrier.company.name}
                              </span>
                              <span className="text-xs">
                                Delievered in {carrier.deliveryTimeInDays.min} -{" "}
                                {carrier.deliveryTimeInDays.max} days
                              </span>

                              {carrier.hasTracking ? (
                                <span className="text-xs text-green-400 block truncate">
                                  Carrier has tracking
                                </span>
                              ) : (
                                <span className="text-xs text-red-400 block truncate">
                                  Carrier does not have tracking
                                </span>
                              )}
                              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                € {carrier.price.value}
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
              Delievered in {selected.deliveryTimeInDays.min} -{" "}
              {selected.deliveryTimeInDays.max} days
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              € {selected.price.value}
            </span>
          </p>
        </>
      ) : (
        <p className="text-red-500 uppercase">
          THIS ITEM IS NOT AVAILABLE FOR SHIPPING TO ALGERIA
        </p>
      )}
    </div>
  );
};
export default ProductShipping;
