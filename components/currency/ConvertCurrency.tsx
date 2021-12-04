import { Fragment, useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const ConvertCurrency = ({ currency }: any) => {
  const t = useTranslations("Currency.convert");
  const [currencies, setCurrencies] = useState([
    { name: t("euroCurrency") },
    { name: t("dollarCurrency") },
    { name: t("poundCurrency") },
  ]);

  const [money, setMoney] = useState({
    dzd: currency[0].live.parallel.purchase,
    devise: 1,
  });
  const [selectedDevise, setSelectedDevise] = useState(currencies[0]);
  const [rate, setRate] = useState<number>(1);

  useEffect(() => {
    if (selectedDevise.name === currencies[0].name) {
      setRate(currency[0].live.parallel.purchase);
    } else if (selectedDevise.name === currencies[1].name) {
      setRate(currency[1].live.parallel.purchase);
    } else if (selectedDevise.name === currencies[2].name) {
      setRate(currency[2].live.parallel.purchase);
    }
  }, [selectedDevise, currency, currencies]);

  useEffect(() => {
    setMoney({ dzd: rate, devise: 1 });
  }, [rate]);

  return (
    <div className="py-32 lg:py-44 px-4 flex flex-col items-center dark:text-yellow-100 bg-yellow-100 dark:bg-grim">
      <h2 className="text-center text-xl lg:text-4xl font-bold">
        {t("inParallelMarket", { devise: selectedDevise.name })}{" "}
        <span className="underline text-gray-700 dark:text-gray-300">
          {t("parallel")}
        </span>{" "}
        {t("market")}
      </h2>
      <form className="mt-8 mx-auto lg:min-w-128 flex flex-col items-center lg:flex-row lg:justify-around">
        <div className="relative">
          <label htmlFor="dzd" className="sr-only">
            From Algerian Dinars
          </label>
          <input
            id="dzd"
            name="dzd"
            value={money.dzd}
            type="number"
            min="0"
            onChange={(e) => {
              setMoney({
                devise: parseFloat(e.target.value) / rate,
                dzd: parseFloat(e.target.value),
              });
            }}
            className="relative mt-1 py-2 pl-3 pr-8 lg:mr-2 text-center dark:bg-grim rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-yellow-200 focus-visible:ring-offset-yellow-200 focus-visible:ring-offset-2 focus-visible:border-yellow-200 sm:text-sm"
          />
          <span className="absolute inset-y-0 right-1 top-1 flex items-center pr-2 pointer-events-none text-gray-500">
            {t("dzd")}
          </span>
        </div>
        <div className="relative">
          <label htmlFor="toUnit" className="sr-only">
            To devise
          </label>
          <input
            id="devise"
            name="devise"
            min="0"
            type="number"
            value={money.devise}
            onChange={(e) => {
              setMoney({
                devise: parseFloat(e.target.value),
                dzd: parseFloat(e.target.value) * rate,
              });
            }}
            className="relative mt-1 py-2 pl-3 pr-8 text-center lg:mr-2 dark:bg-grim rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-yellow-200 focus-visible:ring-offset-yellow-200 focus-visible:ring-offset-2 focus-visible:border-yellow-200 sm:text-sm"
          />
          <span className="absolute inset-y-0 right-2 top-1 flex items-center pr-2 pointer-events-none text-gray-500">
            {selectedDevise.name === currencies[0].name
              ? "€"
              : selectedDevise.name === currencies[1].name
              ? "$"
              : "£"}
          </span>
        </div>
        <Listbox value={selectedDevise} onChange={setSelectedDevise}>
          <div className="relative mt-1">
            <Listbox.Button className="relative py-2 pl-3 pr-10 text-left dark:bg-grim rounded-lg shadow-md cursor-pointer sm:text-sm border-2 border-black dark:border-yellow-200">
              <span className="block truncate">{selectedDevise.name}</span>
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
              <Listbox.Options className="absolute py-1 mt-1 overflow-auto text-base bg-white dark:text-yellow-100 dark:bg-black border-2 border-yellow-200 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {currencies.map((currency, currencyIdx) => (
                  <Listbox.Option
                    key={currencyIdx}
                    className={({ active }) =>
                      `${active ? "font-extrabold" : ""}
                          dark:text-yellow-100 cursor-pointer hover:bg-yellow-100 dark:hover:bg-grim select-none relative py-2 pl-10 pr-4`
                    }
                    value={currency}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {currency.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-amber-600" : "text-amber-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </form>
    </div>
  );
};

export default ConvertCurrency;
