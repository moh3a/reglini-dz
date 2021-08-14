import Link from "next/link";
import { useRouter } from "next/router";
import {
  AccountCircle,
  ShoppingCart,
  FavoriteBorderOutlined,
} from "@material-ui/icons";

import Logo from "./Logo";
import s from "../../styles/layout/Appbar.module.scss";

const Appbar = ({ show, click }: any) => {
  const router = useRouter();
  return (
    <nav className={s.navbar}>
      <div className={s.navbarWrapper}>
        <div className={s.topLeft}>
          <Logo />
        </div>
        <div className={s.topRight}>
          <Link href="/wishlist" passHref>
            <div className={s.navbarIconContainer}>
              <FavoriteBorderOutlined className={s.icon} />
            </div>
          </Link>

          <Link href="/cart" passHref>
            <div className={s.navbarIconContainer}>
              <ShoppingCart className={s.icon} />
              <span className={s.topIconBadge}>2</span>
            </div>
          </Link>

          <Link href="/profile" passHref>
            <div className={s.navbarIconContainer}>
              <div className={s.topAvatar}>
                <AccountCircle className={s.icon} />
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* may add a dark theme toggle, and changing language */}
    </nav>
  );
};

export default Appbar;
