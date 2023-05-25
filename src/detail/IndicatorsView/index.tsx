import { indicators_overview } from "@/contants/detail";
import Card from "@/packages/card";
import Tabs from '@/packages/tabs';
import Content from "@/packages/content";
import styles from './style.module.scss'
import { NodeItem } from "@/types";
import { useEffect, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";

interface Props { 
    accountId:string|string[]|undefined
    
}

export default (props: Props) => { 
    const {  accountId} = props;
    const [interval, setInterVal] = useState<any>('24h');
    const [data, setData] = useState({})

    useEffect(() => { 
        if (accountId) { 
             load_Indicators();
        } else {
            setData({})
        }
    }, [accountId])

         const load_Indicators = (time?: string) => { 
        const intervals = time || interval;
        postAxios(apiUrl.detail_Indicators,{
            account_id: accountId,
            filters: {
            interval:intervals
            }
        }).then((res:any) => { 
        setData(res?.result?.miner_indicators || {})
        })
  }

    return <Card title={indicators_overview.title} ns='detail' header={ 
            <Tabs
            data={indicators_overview.title.list}
            ns='detail'
            className="tabs-right"
            defaultValue={interval}
            border={true}
            onChange={(value: any) => { 
              setInterVal(value.value)
              load_Indicators(value.value)
            }}
          />
       
    }>
      
      <Content
        warpClassName={ styles.indicators_wrap}
          content={indicators_overview.content}
          data={data}
          ns={"detail"}
          ItemClassName={styles.indicators_list_item}
        /> 
      </Card>
}