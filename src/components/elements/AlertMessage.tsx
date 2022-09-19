interface AlertMessageProps {
  type?: "success" | "warning" | "error";
  message?: string;
}

const AlertMessage = ({ type, message }: AlertMessageProps) => {
  return (
    <div
      className={`w-full z-100 my-3 text-sm text-left text-white ${
        type === "success"
          ? "bg-green-500"
          : type === "warning"
          ? "bg-yellow-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-grim"
      } h-12 flex items-center p-5`}
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="w-6 h-6 mx-2 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      {message}
    </div>
  );
};

export default AlertMessage;
