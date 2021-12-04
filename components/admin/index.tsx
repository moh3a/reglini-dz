import AdminCurrency from "./AdminCurrency";
import AdminPayment from "./AdminPayment";
import AdminSidebar from "./AdminSidebar";

const Admin = ({ user }: any) => {
  return (
    <div className="flex">
      <div>
        <AdminSidebar user={user} />
      </div>
      <div className="px-5 w-full bg-white dark:bg-grim">
        <h1 className="my-10 text-2xl font-bold">Welcome {user.name}.</h1>
        <div className="my-2 p-2 border-2 border-black dark:border-yellow-200 rounded-lg">
          <AdminCurrency />
        </div>
        <div className="my-2 p-2 border-2 border-black dark:border-yellow-200 rounded-lg">
          <AdminPayment />
        </div>
      </div>
    </div>
  );
};

export default Admin;
