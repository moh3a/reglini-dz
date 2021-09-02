import Image from "next/image";
import { Tab } from "@headlessui/react";
import AccountDetails from "../account/AccountDetails";
import Settings from "../account/Settings";
import Orders from "../account/Orders";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ user }: any) {
  let categories = ["Profile", "Account", "Orders", "Settings"];

  return (
    <div className="w-full mb-4 lg:mb-8">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-gray-100 dark:bg-grim">
          {categories.map((category) => {
            if (category === "Profile")
              return (
                <Tab key={category} disabled className="w-full overflow-hidden">
                  <div className="flex justify-center items-center">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl || "/user-icon.png"}
                      alt={user.name || "user profile image"}
                      height={25}
                      width={25}
                    />
                    <span className="ml-4 hidden md:inline">{user.name}</span>
                  </div>
                </Tab>
              );
            return (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2 text-xs md:text-sm font-medium text-gray-800 dark:text-gray-100",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-black ring-opacity-60",
                    selected
                      ? "bg-gray-200 dark:bg-gray-800 shadow"
                      : "text-gray-800 hover:bg-gray-200 dark:text-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-700"
                  )
                }
              >
                {category}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>Nothing to show here.</Tab.Panel>

          {/* account tab */}
          <Tab.Panel className="bg-white dark:bg-black p-3">
            <AccountDetails user={user} />
          </Tab.Panel>

          {/* orders tab */}
          <Tab.Panel className="bg-white dark:bg-black p-3">
            <Orders />
          </Tab.Panel>

          {/* settings tab */}
          <Tab.Panel className="bg-white dark:bg-black p-3">
            <Settings />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
