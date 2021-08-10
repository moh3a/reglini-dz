import Link from "next/link";
import Image from "next/image";

import styles from "../styles/components/CartItem.module.scss";
import { ICartItem } from "../types/authType";

interface ICAMSM {
  item: ICartItem;
  qtyChangeHandler: any;
  removeFromCartHandler: any;
}
const CartItem = ({
  item,
  qtyChangeHandler,
  removeFromCartHandler,
}: ICAMSM) => {
  return (
    <div className={styles.cartitem}>
      <div className={styles.cartitemImage}>
        {/* <Image src={item.imageUrl} alt={item.name} /> */}
      </div>

      <Link href={`/product/${item.slug}`} passHref>
        <a className={styles.cartitemName}>{item.name}</a>
      </Link>

      <p className={styles.cartitemPrice}> {item.price} DZD </p>

      <select
        className={styles.cartitemSelect}
        value={item.quantity}
        onChange={(e) => {
          qtyChangeHandler(item.productId, parseInt(e.target.value));
        }}
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {" "}
            {x + 1}{" "}
          </option>
        ))}
      </select>

      <button
        className={styles.cartitemDeleteBtn}
        onClick={() => removeFromCartHandler(item.productId)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
