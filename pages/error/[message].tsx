import { useRouter } from "next/router";

const ErrorScreen = () => {
  const router = useRouter();
  const { message } = router.query;

  return <>{message && <div>{message}</div>}</>;
};

import Layout from "../../components/layout/Layout";
ErrorScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ErrorScreen;
