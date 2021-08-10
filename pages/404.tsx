import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();

  return (
    <div>
      <div onClick={() => router.back()}>Go back.</div>
      <div>ERROR WITH STATUS 404</div>
    </div>
  );
};

import Layout from "../components/layout/Layout";
Custom404.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Custom404;
