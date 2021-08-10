import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { useSession } from "next-auth/client";
import { selectUser } from "../../utils/redux/userSlice";

import styles from "../../styles/layout/Navbar.module.scss";

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
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link href="/" passHref>
          <div>
            reglini.dz preview -{" "}
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

      {/* search bar */}
      <div className={styles.searchbar}>
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
      </div>

      {/* Hamburger menu */}
      <div className={styles.hamburger} onClick={click}>
        {show ? (
          <div>
            <i className="fas fa-times"></i>
          </div>
        ) : (
          <div>
            <i className="fas fa-bars"></i>
          </div>
        )}
      </div>

      {/* Links */}
      <div className={styles.links}>
        <Link href="/wishlist" passHref>
          <li
            className={router.pathname === "/wishlist" ? styles.activeLink : ""}
          >
            <div>
              <i className="far fa-heart"></i>
            </div>
            <div>Wishlist</div>
          </li>
        </Link>
        <Link href="/cart" passHref>
          <li className={router.pathname === "/cart" ? styles.activeLink : ""}>
            <div>
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div>Cart</div>
            {isAuthenticated ? <div>{user.cart.count}</div> : ""}
          </li>
        </Link>
        {session ? (
          <Link href="/profile" passHref>
            <li
              className={
                router.pathname === "/profile" ? styles.activeLink : ""
              }
            >
              <div>
                <i className="fas fa-user-alt"></i>
              </div>
              {/* <Image src={session.user.image} alt="User image" /> */}
              <div>{session.user?.name}</div>
            </li>
          </Link>
        ) : (
          <Link href="/login" passHref>
            <li
              className={router.pathname === "/login" ? styles.activeLink : ""}
            >
              <div>
                <i className="fas fa-user-alt"></i>
              </div>
              <div>Login</div>
            </li>
          </Link>
        )}
      </div>

      {/* may add a dark theme toggle, and changing language */}
    </nav>
  );
};

export default Navbar;
