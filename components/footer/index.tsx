/** @format */
import styles from "./index.module.scss";
import logo from "@/assets/images/logo_a.svg";

import Image from 'next/image'
import { useTranslation } from "react-i18next";
import Item from "antd/es/list/Item";
import { getSvgIcon } from "@/svgUtils";

const footerLinks = [
  {
    label: "twitter",
    type:'_blank',
    link:'https://twitter.com/FilscanOfficial'
  },
    {
      label: "telegram",
          type:'_blank',
    link:'https://t.me/+bI9fUEkmPjMzYjg1'
  },
      {
        label: "outlook",
            type:'_self',
    link:'mailto:filscan@ipfsforce.com'
  }
]
export default () => {
  const { t, i18n } = useTranslation();
  return <div className={styles.footer}>
    <div className={ styles.footer_top}>
       <div className={styles.footer_header}>
      <Image  className={styles.footer_header_logo} src={logo} alt="" />
      {/* <h3 className={styles.footer_header_title}>Filscan</h3> */}
    </div>
      <p className={styles.footer_header_text}>
        <span >{ t("footer_text", { ns: "home" })}  </span>
        <span className={styles.footer_header_text_outlook}>
          {footerLinks.map(linkItem => { 
            return <a key={linkItem.label} target={linkItem.type } style={{ color: '#fff' }} href={linkItem.link}>{
            getSvgIcon(linkItem.label)}</a>  

          })}
        </span>
  
    </p>
    </div>
    <div className={styles.footer_bottom}>
       { t("footer_detail_a", { ns: "home" })}
       <a  href='https://www.mit-license.org/' target='_blank'> MIT</a>     { t("footer_detail_b", { ns: "home" })}  <a  href='https://www.apache.org/licenses/LICENSE-2.0.html' target='_blank'>Apache 2.0</a>   { t("footer_detail_c", { ns: "home" })} .
   </div>
   
  </div>;
};
