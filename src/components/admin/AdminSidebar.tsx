/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import {
  CurrencyEuroIcon,
  AdjustmentsIcon,
  BellIcon,
  ChartBarIcon,
  ClipboardListIcon,
  HomeIcon,
} from "@heroicons/react/outline";

import Avatar from "../elements/Avatar";
import { ReactNode } from "react";
import ToggleDark from "../elements/ToggleDark";

const links = [
  {
    name: "currency",
    icon: <CurrencyEuroIcon className="h-6 w-6" aria-hidden="true" />,
  },
  {
    name: "commission",
    icon: <AdjustmentsIcon className="h-6 w-6" aria-hidden="true" />,
  },
  {
    name: "stats",
    icon: <ChartBarIcon className="h-6 w-6" aria-hidden="true" />,
  },
  {
    name: "orders",
    icon: <ClipboardListIcon className="h-6 w-6" aria-hidden="true" />,
  },
  {
    name: "notifications",
    icon: <BellIcon className="h-6 w-6" aria-hidden="true" />,
  },
];

const Link = ({ link, icon }: { link: string; icon: ReactNode }) => {
  const router = useRouter();
  return (
    <li
      className={`my-6 p-2 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full ${
        router.asPath === `/admin/${link}` &&
        "bg-gray-200 dark:bg-gray-700 rounded-full"
      }`}
      onClick={() => router.push(`/admin/${link}`)}
    >
      {icon}
      {router.asPath === `/admin/${link}` && (
        <p className="text-xs mt-1 select-none">{link}</p>
      )}
    </li>
  );
};

const AdminSidebar = ({ user }: any) => {
  const router = useRouter();
  return (
    <div className="fixed flex flex-row h-screen">
      <nav className="bg-gray-50 dark:bg-grim rounded-r-2xl md:w-32 h-screen justify-between flex flex-col">
        <div className="mt-10 mb-10">
          {user.picture && (
            <div
              className=" w-10 h-10 mb-3 mx-auto"
              onClick={() => router.push("/account")}
            >
              <Avatar picture={user.picture} size="sm" />
            </div>
          )}
          <div className="mt-10">
            <ul>
              {links.map((link, idx) => (
                <Link key={idx} link={link.name} icon={link.icon} />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <ToggleDark />
          <HomeIcon
            onClick={() => router.replace("/")}
            className="h-6 w-6 my-3 cursor-pointer"
            aria-hidden="true"
          />
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
