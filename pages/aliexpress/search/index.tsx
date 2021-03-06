import { useRouter } from "next/router";
import { useEffect } from "react";

const RedirectSearch = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/aliexpress");
  }, [router]);
  return <div>Wait until you will redirected ...</div>;
};

export default RedirectSearch;
