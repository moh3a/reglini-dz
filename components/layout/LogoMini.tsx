import Link from "next/link";
import s from "../../styles/layout/LogoMini.module.scss";

const Logo = () => {
  return (
    <div className={s.minilogoContainer}>
      <Link href="/" passHref>
        <div className={s.minilogo}>
          r<span className={s.minilogoTransparentPart}>.</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
