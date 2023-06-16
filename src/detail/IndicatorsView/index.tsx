import { indicators_overview } from "@/contants/detail";
import Card from "@/packages/custom_card";
import Tabs from '@/packages/tabs';
import Main from "@/packages/main";
import styles from './style.module.scss'
import { NodeItem } from "@/types";
import { useEffect, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";

interface Props { 
    accountId:string|string[]|undefined
    
}

export default (props: Props) => { 
    const {  accountId} = props;
    const [interval, setInterVal] = useState<any>('24h');
    const [data, setData] = useState({})
    const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });
  };
  
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
        }, {
          timeout:undefined
        }).then((res:any) => { 
        setData(res?.result?.miner_indicators || {})
        })
  }

  return <Card
    bgColor={ true}
          ns='detail'
    header={ 
      <div className={styles.indicators_header}>
        <span>{tr(indicators_overview.title.label)}</span>
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
          </div>
           
       
    }>
      <Main warpClassName={styles.indicators_wrap}
          content={indicators_overview.content}
          data={data}
          ns={"detail"}
          ItemClassName={styles.indicators_list_item}/>
      </Card>
}