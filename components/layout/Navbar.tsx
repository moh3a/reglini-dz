import Link from "next/link";
import { useRouter } from "next/router";
import s from "../../styles/layout/Navbar.module.scss";

const Navbar = ({ show, click }: any) => {
  const router = useRouter();
  return (
    <nav className={s.navbar}>
      {/* Logo */}
      <div className={s.logo}>
        <Link href="/" passHref>
          <div>
            reglini.dz -{" "}
            {router.locale === "en"
              ? "english"
              : router.locale === "fr"
              ? "francais"
              : router.locale === "ar"
              ? "mar7aba"
              : ""}{" "}
          </div>
        </Link>
      </div>

      {/* may add a dark theme toggle, and changing language */}
    </nav>
  );
};

export default Navbar;
