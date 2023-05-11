/** @format */

import { useCallback, useEffect, useMemo, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import ChainCharts from "@/packages/chain-charts";
import ChainCard from "@/packages/chain-card";
import CidDetail from '@/src/chain/cid_detail'
import styles from "./index.module.scss";
import { useRouter } from 'next/router'

import {
  LoadingOutlined,LeftOutlined,RightOutlined  
} from '@ant-design/icons';
import { notification } from "antd";

export default () => {
  const [data, setData] = useState<any>([]); //链式图
  const [listData, setListData] = useState<any>([]); //列表
  const [block_size,setBlockSize] = useState<number>(0)
  // const [loading, setLoading] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [record,setRecord] = useState<any>()
  const router = useRouter();
  const asPath = router.asPath;
  const height = asPath.split('height=')[1];
  const cid = asPath.split('cid=')[1]

  const heightDetail = useMemo(() => {
    const data = listData.filter((v: any) => Number(v.height) === Number(height));
    return data
  }, [height, listData])


  const handleResize = () => { 
    const window_width = window.innerWidth;
    if (window_width < 1100 && window_width >= 800 && block_size !== 8) {
      re_load(8);
      setBlockSize(8);
    } else if (window_width < 800 && block_size !== 6) {
      re_load(6);
      setBlockSize(6)
    } else if (block_size !== 12) {
      setBlockSize(12)
      re_load(12);
    } else { 
      re_load(block_size);
    }
  }

  useEffect(() => { 
     postAxios(apiUrl.tipset_chain_FinalHeight, {}).then((res:any) => {
      setMaxHeight(res?.result?.height || 0);
     })
    window.addEventListener('resize', handleResize);
    return () => { 
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  
  const re_load = (page_size?: number) => { 
     if (height) {
       const index = data.findIndex((v: any) => v.height === Number(height))
       if (index < 0) { 
        load(Number(height),true)
      }
    } else { 
      load(undefined,false,page_size);
    }
  }

  useEffect(() => {
     handleResize()
   },[height])

  const load = (maxHeight?: number, search?: boolean,page_size?:number) => {
    let obj = {}
    if (search) { 
      obj = {
        start: maxHeight,
        input_type:"height"
      }

    }else if (maxHeight) {
      obj = {
        end: maxHeight,
      }
     }
    // setLoading(true);
     postAxios(apiUrl.tipset_chain, {
      filters: {
        page_size:page_size||block_size,
        ...obj
      }
    } ).then(
      (res: any) => {
        const data = res?.result?.tipset_list || [];
        // setLoading(false)
        setData(data);
        setListData(data)
      }
    );
 
    
  };

  const showData = height ? heightDetail : listData;
  
  const handleChange = (value:any) => { 
    setRecord(value);  
    
  }

  useEffect(() => { 
    const ma_height = showData && showData[showData.length - 1]?.height;
    const sh_height = record?.block_basic?.height;

    if (sh_height < ma_height) { 
       load(Number(record.block_basic.height),true)
    }
  },[record,showData])
  return (
    <div className={styles.chain}>
      <div className={styles.chain_chart}>
        <span className={styles.chain_chart_leftIcon} onClick={() => { 
          const num = data.length;
          if (num > 0) { 
          if (height) { 
            router.push(`/tipset/chain`)
          } else {
              load(data[num - 1].height);
          }
             
          } 
        } }>
      <LeftOutlined />
        </span>
        <ChainCharts record={ record} data={[...data]} jumpSafeHeight={Number(height)} maxHeight={data[0]?.height} />
        <span className={styles.chain_chart_rightIcon}
          onClick={() => { 
             const calcHeight = data[0]?.height <= maxHeight;
             if (calcHeight) {
                if (height) {
                router.push(`/tipset/chain`)
              } else { 
                load(data[0]?.height + block_size + 1);
              }
             } else { 
                postAxios(apiUrl.tipset_chain_FinalHeight, {}).then((res:any) => {
                  setMaxHeight(res?.result?.height || 0);
                  const showHeight = res?.result?.height;
                  if (showHeight > data[0]?.height) {
                    notification.warning({
                      message: 'Warning',
                      placement: 'topRight',
                      description: 'block height overflow'
                    })
                  } else { 
                    load(data[0]?.height + block_size + 1);
                  }
              })
             

            }
        } }
        ><RightOutlined /></span>
      </div>
  
       <div className={styles.chain_content}>
         {/* {loading && <LoadingOutlined  className={styles.chain_content_loading} />}  */}
        {cid && <CidDetail cid={cid} onChange={ handleChange} />} 
        {!cid && showData.map((dataItem: Record<string, any>,index:number) => {
         return <ChainCard data={dataItem} key={ index}/>;
        })}  
      </div> 
    </div>
  );
};
