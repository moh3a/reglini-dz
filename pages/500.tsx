import { useRouter } from "next/router";

const Custom500 = () => {
  const router = useRouter();

  return (
    <div>
      <div onClick={() => router.back()}>Go back.</div>
      <div>ERROR WITH STATUS 500</div>
    </div>
  );
};

import Layout from "../components/layout/Layout";
Custom500.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Custom500;
