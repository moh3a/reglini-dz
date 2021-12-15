import { useState } from "react";
import AlertMessage from "../elements/AlertMessage";

const AdminPayment = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  return (
    <div>
      {error && <AlertMessage type="error" message={error} />}
      {success && <AlertMessage type="success" message={success} />}
      <h1 className="text-xl font-semibold mb-1">Payment Notifications</h1>
    </div>
  );
};

export default AdminPayment;
