import Logo from "./layout/Logo";

const Loading = ({ text }: { text: string }) => {
  return (
    // <svg
    //   className="animate-ping h-5 w-5 rounded-full border-4 border-t-4 dark:border-gray-100 border-gray-800"
    //   viewBox="0 0 24 24"
    // ></svg>
    <div className="absolute h-screen w-screen inset-0 bg-grim text-lg text-yellow-100 font-bold m-auto flex justify-center items-center text-center z-100">
      <Logo width="50" height="50" loading={true} />
      {text}
    </div>
  );
};

export default Loading;
