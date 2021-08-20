import { useRouter } from "next/router";

import s from "../../styles/banners/AliexpressBanner.module.scss";

const AliexpressBanner = () => {
  const router = useRouter();
  return (
    <div className={s.aliexpressmodule}>
      You can now get any product from{" "}
      <span className={s.aliexpress}>AliExpress</span>,
      <button onClick={() => router.push("/aliexpress")}>Learn more</button>
    </div>
  );
};

export default AliexpressBanner;
