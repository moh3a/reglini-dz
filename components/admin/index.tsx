import AdminCurrency from "./AdminCurrency";
import AdminPayment from "./AdminPayment";
import AdminSidebar from "./AdminSidebar";

const Admin = ({ user }: any) => {
  return (
    <div className="flex">
      <div>
        <AdminSidebar user={user} />
      </div>
      <div className="mx-5 w-full">
        <h1 className="my-10 text-2xl font-bold">Welcome {user.name}.</h1>
        <div className="my-2 p-2 border-2 border-gray-300 rounded-md">
          <AdminCurrency />
        </div>
        <div className="my-2 p-2 border-2 border-gray-300 rounded-md">
          <AdminPayment />
        </div>
      </div>
    </div>
  );
};

export default Admin;
