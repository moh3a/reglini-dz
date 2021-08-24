import Logo from "./layout/Logo";

const Loading = () => {
  return (
    // <svg
    //   className="animate-ping h-5 w-5 rounded-full border-4 border-t-4 dark:border-gray-100 border-gray-800"
    //   viewBox="0 0 24 24"
    // ></svg>
    <Logo width="50" height="50" loading={true} />
  );
};

export default Loading;
