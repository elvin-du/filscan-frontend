/** @format */

import { useEffect, useMemo, useState } from "react";
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
import { userInfo } from "os";

export default () => {
  const [data, setData] = useState<any>([]); //链式图
  const [listData, setListData] = useState<any>([]); //列表
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const router = useRouter();

  const { height ,cid} = router.query

  const heightDetail = useMemo(() => {

      return listData.filter((v: any) => v.height === height)

  }, [height, listData])

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setLoading(true)
    postAxios(apiUrl.tipset_chain_FinalHeight, {}).then((res:any) => {
      setMaxHeight(res?.result?.height ||0)
    })
    
    postAxios(apiUrl.tipset_chain, {
      filters: {
        page_size: 12,
      }
    } ).then(
      (res: any) => {
        const data = res?.result?.tipset_list || []
        // const data:any =[]
        // Object.keys(newObj).map(height => { 
        //   data.push({
        //     height,
        //     result:newObj[height]?.block_basic||[]
        //   })
        // })
        setLoading(false)
        setData(data);
        setListData(data)
      }
    );
    
  };

    //  <!-- Global site tag (gtag.js) - Google Analytics -->
    // <script async src="https://www.googletagmanager.com/gtag/js?id=G-38HGQHT8NF"></script>
    // <script>
    //   window.dataLayer = window.dataLayer || []
    //   function gtag() {
    //     dataLayer.push(arguments)
    //   }
    //   gtag('js', new Date())
    //   gtag('config', 'G-38HGQHT8NF')
    // </script>

  const showData = height ? heightDetail : listData;
  console.log('-----344',showData,data)
  return (
    <div className={styles.chain}>
      <ChainCharts data={data} jumpSafeHeight={ maxHeight} />
       <div className={styles.chain_content}>
        {loading && <LoadingOutlined className={styles.chain_content_loading} />}
        {cid && <CidDetail cid={cid} />} 
        {!cid && showData.map((dataItem: Record<string, any>,index:number) => {
         return <ChainCard data={dataItem} key={ index}/>;
        })}  
      </div> 
    </div>
  );
};
