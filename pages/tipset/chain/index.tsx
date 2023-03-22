/** @format */

import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import ChainCharts from "@/packages/chain-charts";
import ChainCard from "@/packages/chain-card";
import CidDetail from '@/src/chain/cid_detail'
import styles from "./index.module.scss";
import { useRouter } from 'next/router'

import {
  LoadingOutlined
} from '@ant-design/icons';

export default () => {
  const [data, setData] = useState<any>([]); //链式图
  const [listData, setListData] = useState<any>([]); //列表
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const router = useRouter();

  const { height ,cid} = router.query
  console.log('=====345', router)
  
  useEffect(() => { 
    //获取某个高度下的列表
     postAxios(apiUrl.tipset_chain_detail, {}).then((res:any) => {
      console.log('==tipset_chain_heightsearch=46', res)
      //setMaxHeight(res?.result.height)
    })
  }, [height])
  

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setLoading(true)
    postAxios(apiUrl.tipset_chain_height, {}).then((res:any) => {
      setMaxHeight(res?.result?.height ||0)
    })
    
    postAxios(apiUrl.tipset_chain, {
      filters: {
        page_size: 9,
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
        setListData(data)
      }
    );
    
  };

  return (
    <div className={styles.chain}>
      <ChainCharts data={data} jumpSafeHeight={ maxHeight} />
      <div className={styles.chain_content}>
        {loading && <LoadingOutlined className={styles.chain_content_loading} />}
        {cid && <CidDetail cid={cid} />} 
       {!cid && listData.map((dataItem: Record<string, any>) => {
          return <ChainCard data={dataItem} />;
        })} 
      </div>
    </div>
  );
};
