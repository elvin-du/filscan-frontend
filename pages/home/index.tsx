/** @format */

import { apiUrl } from "@/contants/home";
import { postAxios } from "@/store/server";
import { home_tend } from "@/contants/home";
import styles from "./index.module.scss";
import Meta from "./meta";
import Trend from "./trend";

interface Props {
  TotalIndicators: Record<string, string | number>;
  power_trend: Record<string, string>;
}

function Home(props: Props) {
  console.log("====33", props.power_trend);
  return (
    <div className={styles.home}>
      <Meta TotalIndicators={props.TotalIndicators} />
      <div className={styles.home_trend}>
        {home_tend.map((trend_item, index) => {
          return (
            <Trend
              key={index}
              title={"test1"}
              record={trend_item}
              data={props.power_trend}
            />
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
  const res_trend: any = await postAxios(apiUrl.line_trend);
  const trend_lineData: any = {
    total_power: [],
    base_line_power: [],
    total_increase_power: [],
  };
  const dateList: any = [];
  res_trend.result.base_line_trend_list.forEach((item: any) => {
    const { total_power, base_line_power, total_increase_power, date } = item;
    dateList.push(date);
    trend_lineData.total_power.push({
      date: date,
      value: total_power,
    });
    trend_lineData.base_line_power.push({
      date: date,
      value: base_line_power,
    });
    trend_lineData.total_increase_power.push({
      date: date,
      xAxisIndex: 1,
      value: total_increase_power,
    });
  });
  return {
    props: {
      TotalIndicators: res_meta?.result?.total_indicators || {},
      power_trend: {
        series: trend_lineData,
        dateList,
      },
    },
  };
}

export default Home;
