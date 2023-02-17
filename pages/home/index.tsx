/** @format */

import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { home_tend } from "@/contants/home";
import { unitConversion } from "@/utils/utils";
import styles from "./index.module.scss";
import Meta from "./meta";
import Trend from "@/pages/statistics/Trend";
import Gas from "@/pages/statistics/Gas";

interface Props {
  TotalIndicators: Record<string, string | number>;
  power_trend: Record<string, string>;
}

function Home(props: Props) {
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
