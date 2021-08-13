import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { useSession } from "next-auth/client";
import { selectUser } from "../../utils/redux/userSlice";

import { Badge, IconButton } from "@material-ui/core";

import {
  ShoppingCart,
  FavoriteOutlined,
  AccountCircle,
} from "@material-ui/icons";

import s from "../../styles/layout/Navbar.module.scss";
import Logo from "./Logo";

const Navbar = ({ show, click }: any) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const { isAuthenticated, user } = useSelector(selectUser);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const q = e.currentTarget.value;
      router.push(
        {
          pathname: `/search`,
          query: q ? { q } : {},
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <nav className={s.navbar}>
      <div className={s.navbarWrapper}>
        <div className={s.topLeft}>
          <Logo />
        </div>
        <div className={s.topRight}>
          <div className={s.navbarIconContainer}>
            <Link href="/wishlist" passHref>
              {/* <div className={router.pathname === "/wishlist" ? s.activeLink : ""}> */}
              <IconButton>
                <FavoriteOutlined />
              </IconButton>
            </Link>
          </div>

          <div className={s.navbarIconContainer}>
            <Link href="/cart" passHref>
              {/* <div className={router.pathname === "/cart" ? s.activeLink : ""}> */}
              <IconButton>
                {isAuthenticated ? (
                  <Badge badgeContent={user.cart.count} color="error">
                    <ShoppingCart />
                  </Badge>
                ) : (
                  <ShoppingCart />
                )}
              </IconButton>
            </Link>
          </div>

          <div className={s.navbarIconContainer}>
            {session ? (
              <Link href="/profile" passHref>
                {/* <div className={router.pathname === "/profile" ? s.activeLink : ""}> */}
                <IconButton>
                  <AccountCircle />
                </IconButton>
                {session.user?.name}
              </Link>
            ) : (
              <Link href="/login" passHref>
                {/* <div className={router.pathname === "/login" ? s.activeLink : ""}> */}
                <IconButton>Login</IconButton>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* search bar */}
      {/* <div className={styles.searchbar}>
        <label className={styles.hidden} htmlFor="search">
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="search"
          autoComplete="off"
          onKeyUp={handleKeyUp}
        />
        <button type="submit" className={styles.search}>
          <i className="fas fa-search"></i>
        </button>
      </div> */}

      {/* Hamburger menu */}
      {/* <div className={styles.hamburger} onClick={click}>
        {show ? (
          <div>
            <i className="fas fa-times"></i>
          </div>
        ) : (
          <div>
            <i className="fas fa-bars"></i>
          </div>
        )}
      </div> */}

      {/* may add a dark theme toggle, and changing language */}
    </nav>
  );
};

export default Navbar;
