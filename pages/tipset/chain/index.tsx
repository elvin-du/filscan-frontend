/** @format */

import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import ChainCharts from "@/packages/chain-charts";
import ChainCard from "@/packages/chain-card";
import styles from "./index.module.scss";

export default () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_chain_list, { count: 5, end_height: 2497365 }).then(
      (res: any) => {
        setData([res?.result]);
      }
    );
    // postAxios(apiUrl.tipset_chain, { count: 1 }).then((result) => {
    //   console.log("====rrttr", result);
    // });
  };

  return (
    <div className={styles.chain}>
      <ChainCharts data={data} />
      <div className={styles.chain_content}>
        {data.map((dataItem: Record<string, any>) => {
          return <ChainCard data={dataItem} />;
        })}
      </div>
    </div>
  );
};
