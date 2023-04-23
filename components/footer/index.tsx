/** @format */
import styles from "./index.module.scss";
import logo from "@/public/logo.png";
import { MailOutlined } from '@ant-design/icons';

import Image from 'next/image'
export default () => {
  return <div className={styles.footer}>
    <div className={ styles.footer_top}>
       <div className={styles.footer_header}>
      <Image  className={styles.footer_header_logo} src={logo} alt="" />
      <h3 className={styles.footer_header_title}>Filscan</h3>
    </div>
      <p className={styles.footer_header_text}>
      Filscan浏览器是 Filecoin 区块链浏览器及数据服务平台，提供基于 Filecoin 的各类收节点收益排行榜、区块链数据查询、可视化图表等一站式数据服务。
        <span className={styles.footer_header_text_outlook}>邮箱: <MailOutlined style={{ margin: '0px 6px' }} /> <a style={{color:'#fff'}} href="mailto:filscan@ipfsforce.com">filscanteam@outlook.com</a>
</span>
    </p>
    </div>
    <div className={ styles.footer_bottom}>
      版权所有 © Filecoin开发补助计划 遵循 <a style={{color:'#0090ff'}} href='https://www.mit-license.org/' target='_blank'> MIT</a>  和  <a  style={{color:'#0090ff'}} href='https://www.apache.org/licenses/LICENSE-2.0.html' target='_blank'>Apache 2.0</a>  版权协议.
   </div>
   
  </div>;
};
