import styles from "../../styles/layout/Backdrop.module.scss";

const Backdrop = ({ show, click }: any) => {
  return show && <div className={styles.backdrop} onClick={click}></div>;
};

export default Backdrop;
