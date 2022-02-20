import { Tab } from "@headlessui/react";
import ConvertCurrency from "./ConvertCurrency";
import HistoricalRates from "./HistoricalRates";
import LiveRate from "./LiveRate";
import { useTranslations } from "next-intl";
import { CurrencyView } from "./CurrencyCard";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Currency = ({ currency }: any) => {
  const t = useTranslations("Currency");

  const tabname = [t("liveRate.name"), t("convert.name"), t("historical.name")];
  return (
    <Tab.Group>
      <Tab.List className="flex justify-center p-1 space-x-1  rounded-xl">
        {tabname.map((name) => (
          <Tab
            key={name}
            className={({ selected }) =>
              classNames("w-full p-4", selected && "bg-gray-200 dark:bg-grim")
            }
          >
            {name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <LiveRate currency={currency} />
        </Tab.Panel>
        <Tab.Panel>
          <ConvertCurrency currency={currency} />
        </Tab.Panel>
        <Tab.Panel>
          <HistoricalRates />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
  // const list = [
  //   { exchange: "DZDEUR", symbol: "€", current: 216, rate: 1 },
  //   { exchange: "DZDUSD", symbol: "$", current: 193, rate: 2 },
  //   { exchange: "DZDGBP", symbol: "£", current: 256, rate: 0.3 },
  // ];
  // return (
  //   <CurrencyView
  //     list={list}
  //     title="placeholder"
  //     subtitle="placeholder subtitle"
  //   />
  // );
};
export default Currency;
