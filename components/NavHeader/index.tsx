/** @format */
import Image from "next/image";
import logo from "@/public/logo.png";
import styles from "./index.module.scss";

function NavHead() {
  return (
    <div className={styles.head}>
      <div className={styles.top}>
        <div className={styles.top_content}>
          <Image src={logo} alt='Fliscan Logo' className={styles.logo} />
          <h3 className={styles.logo_title}>Filscan</h3>
          <div className={styles.top_right}></div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default NavHead;
