import { useState } from "react";
import AdminCurrency from "./AdminCurrency";
import AdminPayment from "./AdminPayment";
import AdminFinance from "./AdminFinance";
import AdminSidebar from "./AdminSidebar";

const Admin = ({ user }: any) => {
  const [tab, setTab] = useState("currency");

  return (
    <div className="flex">
      <div>
        <AdminSidebar tab={tab} setTab={setTab} user={user} />
      </div>
      <div className="px-5 w-full bg-white dark:bg-grim">
        <h1 className="my-10 text-2xl font-bold">Welcome {user.name}.</h1>
        {tab === "currency" && (
          <div className="my-2 p-2 border-2 border-black dark:border-yellow-200 rounded-lg">
            <AdminCurrency />
          </div>
        )}
        {tab === "commission" && (
          <div className="my-2 p-2 border-2 border-black dark:border-yellow-200 rounded-lg">
            <AdminFinance />
          </div>
        )}
        {tab === "paymentNotifications" && (
          <div className="my-2 p-2 border-2 border-black dark:border-yellow-200 rounded-lg">
            <AdminPayment />
          </div>
        )}
        {tab === "stats" && (
          <div className="my-2 p-2 border-2 border-black dark:border-yellow-200 rounded-lg">
            Coming Soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
