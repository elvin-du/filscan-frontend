/** @format */

import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { home_tend } from "@/contants/home";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import styles from "./index.module.scss";
import Meta from "./meta";
import Trend from "@/pages/statistics/Trend";
import Gas from "@/pages/statistics/Gas";
import Rank from "@/pages/rank";
import rank from "@/assets/images/home/ranking@2x.png";

interface Props {
  TotalIndicators: Record<string, string | number>;
  power_trend: Record<string, string>;
}

function Home(props: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.home}>
      <Meta TotalIndicators={props.TotalIndicators} />
      <div className={styles.home_trend}>
        {home_tend.map((item, index) => {
          let content = null;
          if (item.label === "power") {
            content = <Trend type={"power"} headerData={{ title: item }} />;
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
        <div className='default-card-title'>
          <Image src={rank} alt='' width={19} className='image-icon' />
          <span>{t("rank", { ns: "home" })}</span>
        </div>
        <Rank />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const res_meta: any = await postAxios(
    apiUrl.home_meta //区块高度
  );

  return {
    props: {
      TotalIndicators: res_meta?.result?.total_indicators || {},
    },
  };
}

export default Home;
