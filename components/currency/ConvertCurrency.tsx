import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const currencies = [
  { id: 1, name: "EURO" },
  { id: 2, name: "US DOLLARS" },
  { id: 3, name: "UK POUND" },
];

const ConvertCurrency = ({ currency }: any) => {
  const [money, setMoney] = useState({
    dzd: currency[0].live.parallel.purchase,
    devise: 1,
  });
  const [selectedDevise, setSelectedDevise] = useState(currencies[0]);
  const [rate, setRate] = useState<number>(1);

  useEffect(() => {
    if (selectedDevise.name === "EURO") {
      setRate(currency[0].live.parallel.purchase);
    } else if (selectedDevise.name === "US DOLLARS") {
      setRate(currency[1].live.parallel.purchase);
    } else if (selectedDevise.name === "UK POUND") {
      setRate(currency[2].live.parallel.purchase);
    }
  }, [selectedDevise, currency]);

  useEffect(() => {
    setMoney({ dzd: rate, devise: 1 });
  }, [rate]);

  return (
    <div className="py-32 lg:py-44 px-4 flex flex-col items-center bg-gray-300 dark:bg-gray-700">
      <h2 className="text-center text-xl lg:text-4xl font-bold">
        Convert Algerian Dinars (DZD) to {selectedDevise.name} with the{" "}
        <span className="underline text-gray-700 dark:text-gray-300">
          parallel
        </span>{" "}
        market rates
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
            className="relative mt-1 py-2 pl-3 pr-8 lg:mr-2 text-center bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          />
          <span className="absolute inset-y-0 right-1 top-1 flex items-center pr-2 pointer-events-none text-gray-500">
            DZD
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
            className="relative mt-1 py-2 pl-3 pr-8 text-center lg:mr-2 bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          />
          <span className="absolute inset-y-0 right-2 top-1 flex items-center pr-2 pointer-events-none text-gray-500">
            {selectedDevise.name === "EURO"
              ? "€"
              : selectedDevise.name === "US DOLLARS"
              ? "$"
              : "£"}
          </span>
        </div>
        <Listbox value={selectedDevise} onChange={setSelectedDevise}>
          <div className="relative mt-1">
            <Listbox.Button className="relative py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
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
              <Listbox.Options className="absolute py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {currencies.map((currency, currencyIdx) => (
                  <Listbox.Option
                    key={currencyIdx}
                    className={({ active }) =>
                      `${
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                      }
                          cursor-default select-none relative py-2 pl-10 pr-4`
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
