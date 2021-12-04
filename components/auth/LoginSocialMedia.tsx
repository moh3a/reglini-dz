import { signIn } from "next-auth/client";

const LoginSocialMedia = ({ providers }: any) => {
  return (
    <div className="flex flex-col lg:py-6">
      {Object.values(providers).map((provider: any) => {
        if (provider.name === "credentials") return;
        // the credentials form is already added above
        if (provider.id === "google") {
          return (
            // <div className="">
            //   <a key={provider.name} target="_blank">
            //     <button
            // onClick={() => signIn(provider.id)}
            // tabIndex={5}
            // type="button"
            //       className="w-full inline-flex px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white dark:bg-grim hover:bg-grim dark:hover:bg-gray-100 border rounded-lg border-gray-800 dark:border-gray-100 hover:text-white dark:text-gray-100 dark:hover:text-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            //     >
            //       <div className="flex items-center justify-center">
            //         <i className="fab fa-google"></i> Continue with Google
            //       </div>
            //     </button>
            //   </a>
            // </div>
            <div className="my-1">
              <a key={provider.name} target="_blank">
                <button
                  onClick={() => signIn(provider.id)}
                  tabIndex={5}
                  type="button"
                  className="w-full px-4 py-3 rounded-lg border border-black bg-black text-white hover:bg-gray-100 hover:text-black"
                >
                  <i className="fab fa-google"></i>
                  <span className="pl-3 font-bold"> Continue with Google</span>
                </button>
              </a>
            </div>
          );
        }
        if (provider.id === "facebook") {
          return (
            // <div className="">
            //   <a key={provider.name} target="_blank">
            //     <button
            //       onClick={() => signIn(provider.id)}
            //       tabIndex={6}
            //       type="button"
            //       className="w-full inline-flex px-4 py-3 font-semibold  transition duration-500 ease-in-out transform border rounded-lg border-gray-800 dark:border-gray-100 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 text-facebook hover:bg-facebook hover:text-gray-100 dark:text-gray-100 dark:bg-facebook dark:hover:bg-gray-100 dark:hover:text-facebook"
            //     >
            //       <i className="fab fa-facebook-f"></i>
            //       <span className="pl-5"> Continue with Facebook</span>
            //       {/* <div className="flex items-center justify-center">
            //       </div> */}
            //     </button>
            //   </a>
            // </div>
            <div className="my-1">
              <a key={provider.name} target="_blank">
                <button
                  onClick={() => signIn(provider.id)}
                  tabIndex={6}
                  type="button"
                  className="w-full px-4 py-3 rounded-lg border border-facebook bg-facebook text-white hover:bg-gray-100 hover:text-facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                  <span className="pl-3 font-bold">
                    {" "}
                    Continue with Facebook
                  </span>
                </button>
              </a>
            </div>
          );
        }
        // if (provider.id === "instagram") {
        //   return (
        //     <a key={provider.name} target="_blank">
        //       <button
        //         onClick={() => signIn(provider.id)}
        //         tabIndex={6}
        //         type="button"
        //         className="inline-flex px-4 py-3 font-semibold  transition duration-500 ease-in-out transform border rounded-lg border-gray-800 dark:border-gray-100 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 text-yellow-500 hover:bg-yellow-500 hover:text-gray-100 dark:text-gray-100 dark:bg-yellow-500 dark:hover:bg-gray-100 dark:hover:text-yellow-500"
        //       >
        //         <div className="flex items-center justify-center">
        //           <i className="fab fa-instagram"></i>
        //         </div>
        //       </button>
        //     </a>
        //   );
        // } else if (provider.id === "auth0") {
        //   return (
        //     <a key={provider.name} target="_blank">
        //       <button
        //         onClick={() => signIn(provider.id)}
        //         tabIndex={5}
        //         type="button"
        //         className="inline-flex px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white dark:bg-grim hover:bg-grim dark:hover:bg-gray-100 border rounded-lg border-gray-800 dark:border-gray-100 hover:text-white dark:text-gray-100 dark:hover:text-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
        //       >
        //         <div className="flex items-center justify-center">
        //           <i className="fas fa-sign"></i>
        //         </div>
        //       </button>
        //     </a>
        //   );
        // }
      })}
    </div>
  );
};
export default LoginSocialMedia;
