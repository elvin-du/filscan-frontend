/** @format */

import { home_tend } from "@/contants/home";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import styles from "./index.module.scss";
import Meta from "./meta";
import Trend from "@/src/statistics/Trend";
import Gas from "@/src/statistics/Gas";
import Rank from "@/pages/rank";
import Banner from '@/components/banner'
import { getSvgIcon } from "@/svgUtils";

function Home() {
  const { t } = useTranslation();
 
  return (
    <div className={styles.home}>
      <Banner />
      <Meta />
      <div className={styles.home_trend}>
        {home_tend.map((item, index) => {
          let content = null;
          if (item.label === "power") {
            content = <Trend type={"power"} default='home'  headerData={{ title: item }} />;
          } else {
            content = <Gas type={"gas"} headerData={{ title: item }} />;
          }
          return (
            <div key={index} className={`${styles.home_trend_content}`}>
              {content}
            </div>
          );
        })}
      </div>
      <div className={`default-card ${styles.home_rank}`}>
        <div className='default-card-title font_18'>
          <span className='image-icon-svg'>{ getSvgIcon('rank')}</span>
          <span>{t("rank", { ns: "home" })}</span>
        </div>
        <Rank type='home'/>
      </div>
    </div>
  );
}

export default Home;
