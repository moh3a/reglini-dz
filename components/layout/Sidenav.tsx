import Link from "next/link";

import styles from "../../styles/layout/Sidenav.module.scss";

const Sidenav = ({ show, click }: any) => {
  const styleSidenav = () => {
    if (typeof window !== "undefined") {
      document.onclick = () => {
        return styles.hideSidenav;
      };
    }
    if (show) {
      return styles.showSidenav;
    }
    return styles.hideSidenav;
  };
  return (
    <nav className={styleSidenav()}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link href="/">reglini</Link>
      </div>

      {/* Links */}
      <div className={styles.links} onClick={click}>
        <Link href="/wishlist" passHref>
          <li>
            <div>
              <i className="far fa-heart"></i>
            </div>
            <p>Wishlist</p>
          </li>
        </Link>
        <Link href="/cart" passHref>
          <li>
            <div>
              <i className="fas fa-shopping-cart"></i>
            </div>
            <p>Cart</p>
          </li>
        </Link>
        <Link href="/login" passHref>
          <li>
            <div>
              <i className="fas fa-user-alt"></i>
            </div>
            <p>Account</p>
          </li>
        </Link>
      </div>

      {/* may add a dark theme toggle, and changing language */}
    </nav>
  );
};

export default Sidenav;
