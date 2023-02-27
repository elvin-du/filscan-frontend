/** @format */

import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import ChainCharts from "@/packages/chain-charts";

export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_chain_list, { count: 5, end_height: 2497365 }).then(
      (res: any) => {
        setData(res?.result?.blocks);
      }
    );
    // postAxios(apiUrl.tipset_chain, { count: 1 }).then((result) => {
    //   console.log("====rrttr", result);
    // });
  };

  return (
    <div>
      <ChainCharts data={data} />
    </div>
  );
};
