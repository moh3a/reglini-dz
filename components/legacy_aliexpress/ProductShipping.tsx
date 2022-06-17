import { Fragment, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
  fetchCommission,
  fetchCurrencyRate,
  IFinance,
  selectFinance,
} from "../../utils/redux/financeSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductShipping = ({ product, setSelectedShipping }: any) => {
  const router = useRouter();
  const t = useTranslations("AEProduct");
  const [selected, setSelected] = useState(product.shipping.carriers[0]);
  useEffect(() => {
    if (selected) setSelectedShipping(selected);
  }, [selected, setSelectedShipping]);

  const dispatch = useDispatch();
  const { rate, commission }: IFinance = useSelector(selectFinance);

  const LocalCurrencyConverter = useCallback(
    (price: number, exchange: "DZDEUR" | "DZDUSD" | "DZDGBP") => {
      let currency: number = 0;
      if (rate && commission) {
        const rateIndex = rate.findIndex((c) => c.exchange === exchange);
        if (rateIndex !== -1) currency = rate[rateIndex].live.parallel.sale;
        return (
          Math.ceil((price * currency + price * currency * commission) / 10) *
          10
        );
      } else {
        dispatch(fetchCommission());
        dispatch(fetchCurrencyRate());
      }
    },
    [dispatch, commission, rate]
  );

  return (
    <div className={`text-left z-10 mt-4`}>
      {product.shipping.isAvailableForSelectedCountries ? (
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
                                {t("delieveredIn")}{" "}
                                {carrier.deliveryTimeInDays.min} -{" "}
                                {carrier.deliveryTimeInDays.max} {t("days")}
                              </span>

                              {carrier.hasTracking ? (
                                <span className="text-xs text-green-400 block truncate">
                                  {t("carrierHasTracking")}
                                </span>
                              ) : (
                                <span className="text-xs text-red-400 block truncate">
                                  {t("carrierDontHaveTracking")}
                                </span>
                              )}
                              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {LocalCurrencyConverter(
                                  carrier.price.value,
                                  "DZDEUR"
                                )}{" "}
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
              {t("delieveredIn")} {selected.deliveryTimeInDays.min} -{" "}
              {selected.deliveryTimeInDays.max} {t("days")}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              {LocalCurrencyConverter(selected.price.value, "DZDEUR")}{" "}
              {t("dzd")}
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
