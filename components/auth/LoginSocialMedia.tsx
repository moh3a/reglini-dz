import { signIn } from "next-auth/client";

const LoginSocialMedia = ({ providers }: any) => {
  return (
    <div className="flex flex-col lg:py-6">
      {Object.values(providers).map((provider: any) => {
        if (provider.name === "credentials") return;
        if (provider.id === "google") {
          return (
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
      })}
    </div>
  );
};

export default LoginSocialMedia;
