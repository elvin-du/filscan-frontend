/** @format */
import { useTranslation } from "react-i18next";
import Charts from "@/src/statistics/charts";
import Card from '@/packages/card'
import { charts } from "@/contants/statistic";
import styles from "../../index.module.scss";
import { useEffect, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import Tabs from "@/packages/tabs";
import { formatFil } from "@/utils/utils";


function Overview({ data }: { data: any }) {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "static" });
  };
    
    const [blockData, setBlockData] = useState({})
    const [activeNode, setActiveNode] = useState({})
    const [meaasge,setMessage] = useState({})

    useEffect(() => { 
        load_block_trend()
        load_active_miner()
        load_message_trend()
    }, [])
    
    const load_block_trend = (time?: string) => { 
        const interval = time || '24h';
        postAxios(apiUrl.static_block_trend, { interval }).then((res:any) => {
            const dateList:any = [];
            const seriesObj:any = {
                block_reward_per_tib: [],
                acc_block_rewards:[]
            }
            res?.result?.items?.forEach((value: any) => {
            const {
            block_time,
            acc_block_rewards,
            block_reward_per_tib,
            } = value;
            const showTime =block_time.split("+")[0];
            dateList.push(showTime);
                seriesObj.acc_block_rewards.push({
                    value: formatFil(acc_block_rewards, 'FIL'),
                    unit:'FIL'
                }   
            
            );
            seriesObj.block_reward_per_tib.push(
                {
                    value: formatFil(block_reward_per_tib, 'FIL'),
                    unit:'FIL/T'
                }
            );
            });
            setBlockData({
                xData: dateList,
                seriesObj
            })
         })
    }

    const load_active_miner = (time?: string) => { 
          const interval = time || '24h';
        postAxios(apiUrl.static_active_miner, { interval }).then((res:any) => {
            const dateList:any = [];
            const seriesObj:any = {
                active_miner_count: [],
            }
            res?.result?.items?.forEach((value: any) => {
            const {
            block_time,
            active_miner_count,
            } = value;
            const showTime =block_time.split("+")[0];
            dateList.push(showTime);
            seriesObj.active_miner_count.push({
                value: active_miner_count,
                unit:''
            }   
            
            )
            });
            setActiveNode({
                xData: dateList,
                seriesObj
            })
         })
    }

    const load_message_trend = (time?:string) => { 
            const interval = time || '24h';
        postAxios(apiUrl.static_message_trend, { interval }).then((res:any) => {
            const dateList:any = [];
            const seriesObj:any = {
                message_count: [],
                all_message_count :[]
            }
            res?.result?.items?.forEach((value: any) => {
            const {
            block_time,
            message_count,
            all_message_count,
            } = value;
            const showTime =block_time.split("+")[0];
            dateList.push(showTime);
            seriesObj.message_count.push({
                    value: message_count,
                    unit:''
            }   
            );
                
            seriesObj.all_message_count.push(
                {
                    value: all_message_count,
                    unit:''
                }
            );
            });
            setMessage({
                xData: dateList,
                seriesObj
            })
         })
    }

    
    const { block_trend, header } = charts;

    return <div className={ styles.static_charts}>
        <Card title={block_trend.title} ns={'static'} header={ 
       <Tabs
        data={header}
            ns='rank'
            border={ true}
            defaultValue={'24h'}
            onChange={(value) => { 
                load_block_trend(value.value)
        }}
      />
    }>
        <Charts  type='block_trend' data={blockData}   />  
        </Card>

        <Card title={block_trend.title} ns={'static'} header={ 
       <Tabs
        data={header}
            ns='rank'
            border={ true}
            defaultValue={'24h'}
            onChange={(value) => { 
            load_active_miner(value.value)
        }}
      />
    }>
        <Charts  type='active_nodes' data={activeNode}   />  
        </Card>
        <Card title={block_trend.title} ns={'static'} header={ 
       <Tabs
        data={header}
            ns='rank'
            border={ true}
            defaultValue={'24h'}
            onChange={(value) => { 
            load_message_trend(value.value)
        }}
      />
    }>
        <Charts  type='messages_trend' data={meaasge}   />  
    </Card>
    </div>
    
}
export default Overview;
