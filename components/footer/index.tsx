/** @format */
import styles from "./index.module.scss";
import logo from "@/public/logo.png";
import { MailOutlined } from '@ant-design/icons';

import Image from 'next/image'
import { useTranslation } from "react-i18next";
export default () => {
  const { t, i18n } = useTranslation();
  return <div className={styles.footer}>
    <div className={ styles.footer_top}>
       <div className={styles.footer_header}>
      <Image  className={styles.footer_header_logo} src={logo} alt="" />
      <h3 className={styles.footer_header_title}>Filscan</h3>
    </div>
      <p className={styles.footer_header_text}>
        <span style={{flex:1}}>{ t("footer_text", { ns: "home" })}  </span>
        
        <span className={styles.footer_header_text_outlook}> { t("footer_outlook", { ns: "home" })}: <MailOutlined style={{ margin: '0px 6px' }} /> <a style={{color:'#fff'}} href="mailto:filscan@ipfsforce.com">filscanteam@outlook.com</a>
</span>
    </p>
    </div>
    <div className={styles.footer_bottom}>
       { t("footer_detail_a", { ns: "home" })}
       <a style={{color:'#0090ff'}} href='https://www.mit-license.org/' target='_blank'> MIT</a>     { t("footer_detail_b", { ns: "home" })}  <a  style={{color:'#0090ff'}} href='https://www.apache.org/licenses/LICENSE-2.0.html' target='_blank'>Apache 2.0</a>   { t("footer_detail_c", { ns: "home" })} .
   </div>
   
  </div>;
};
