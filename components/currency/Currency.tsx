import { Tab } from "@headlessui/react";
import ConvertCurrency from "./ConvertCurrency";
import HistoricalRates from "./HistoricalRates";
import LiveRate from "./LiveRate";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Currency = ({ currency }: any) => {
  const tabname = ["Live Rate", "Convert", "Historical Rates"];
  return (
    <Tab.Group>
      <Tab.List className="flex justify-center p-1 space-x-1  rounded-xl">
        {tabname.map((name) => (
          <Tab
            key={name}
            className={({ selected }) =>
              classNames(
                "w-full p-4 bg-gray-100 hover:bg-gray-200",
                selected ? "bg-gray-400" : ""
              )
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
          <ConvertCurrency />
        </Tab.Panel>
        <Tab.Panel>
          <HistoricalRates />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
export default Currency;
