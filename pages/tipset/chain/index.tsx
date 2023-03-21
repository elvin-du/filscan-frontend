/** @format */

import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import ChainCharts from "@/packages/chain-charts";
import ChainCard from "@/packages/chain-card";
import styles from "./index.module.scss";
import {
  LoadingOutlined
} from '@ant-design/icons';

export default () => {
  const [data, setData] = useState<any>([]);
  const [current, setCurrent] = useState(1);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setLoading(true)
    postAxios(apiUrl.searchInfo, {
      input:'2702099'
    }).then(res => { 
      console.log('==search=46',res)
    })
    postAxios(apiUrl.tipset_chain, {
      filters: {
        page_size: 6,
      }
    } ).then(
      (res: any) => {
        const newObj = res?.result?.block_basic_list || {};
        const data:any =[]
        Object.keys(newObj).map(height => { 
          data.push({
            height,
            result:newObj[height]
          })
        })
        setLoading(false)
       setData(data);
      }
    );
    
  };

  return (
    <div className={styles.chain}>
      <ChainCharts data={data} />
      <div className={styles.chain_content}>
        { loading && <LoadingOutlined className={styles.chain_content_loading}/>}
       {data.map((dataItem: Record<string, any>) => {
          return <ChainCard data={dataItem} />;
        })} 
      </div>
    </div>
  );
};
