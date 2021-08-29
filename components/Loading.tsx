import Logo from "./layout/Logo";

const Loading = ({ text }: { text: string }) => {
  return (
    // <svg
    //   className="animate-ping h-5 w-5 rounded-full border-4 border-t-4 dark:border-gray-100 border-gray-800"
    //   viewBox="0 0 24 24"
    // ></svg>
    <div className="my-32 flex flex-col justify-center items-center text-center">
      <Logo width="50" height="50" loading={true} />
      {text}
    </div>
  );
};

export default Loading;
