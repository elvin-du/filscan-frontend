import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import styles from "./index.module.scss";
import Search from "./Search";
import Menu from './Menu';
import Router from "next/router";

export default () => {
    return <div className={styles.mobile_header}>
        <div className={styles.mobile_header_top}>
            <div className={styles.mobile_header_top_image} onClick={() => { 
                Router.push('/home')
            }}>
            <Image src={logo} alt='Fliscan Logo' className={styles.mobile_header_logo} />
             <span className={styles.logo_title}>Filscan</span>
            </div>
            <div className={styles.mobile_header_top_right}>
               <Menu />
            </div>
 
        </div>
        <div className={styles.mobile_header_bottom}> 
         <Search />
        </div>
     
    </div>
 }