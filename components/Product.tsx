import Link from "next/link";

import { IProduct } from "../types/productType";
import styles from "../styles/components/Product.module.scss";
// import Image from "next/image";

const Product = ({ imageUrl, name, slug, price, description }: IProduct) => {
  return (
    <div className={styles.product}>
      {/* <Image src={imageUrl} alt={name} layout="fill" /> */}
      <div className={styles.productInfo}>
        <p className={styles.infoName}> {name} </p>
        <p className={styles.infoDescription}> {description} </p>
        <p className={styles.infoPrice}>{price} DZD </p>
        <Link href={`/product/${slug}`}>
          <a className={styles.infoButton}>View</a>
        </Link>
      </div>
    </div>
  );
};

export default Product;
