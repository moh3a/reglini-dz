import Link from "next/link";
import s from "../../styles/layout/Logo.module.scss";

const Logo = () => {
  return (
    <>
      <Link href="/" passHref>
        <div className={s.fulllogo}>
          reglini.<span className={s.fulllogoTransparentPart}>dz</span>
        </div>
      </Link>
      {/* <Link href="/" passHref>
        <div className={s.minilogo}>
          r<span className={s.minilogoTransparentPart}>.</span>
        </div>
      </Link> */}
    </>
  );
};

export default Logo;
