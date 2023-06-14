/** @format */

import Content from "@/packages/content";
import Card from "@/packages/card";
import { account_change, general_overview, general_overview_type } from "@/contants/detail";
import AccountChange from '@/components/accountChange'
import { useEffect, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import { useRouter } from "next/router";
import Tabs from "@/packages/tabs";
import List from "@/src/detail/list";
import styles from "../index.module.scss";
import { useTranslation } from "react-i18next";

export default  () => {
  const router = useRouter();
  const { address } = router.query;
  console.log('----2',address)
  const [data, setData] = useState<any>({})
  const [content, setContent] = useState([])
  const [type, setType] = useState('')
  const [interval, setInterval] = useState('24h');
   const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });

    //f02014853
  };
  useEffect(() => { 
    //账户概览
    if (address) { 
       postAxios(apiUrl.detail_account, { account_id: address }).then(
         (res: any) => {
           const data = res?.result?.account_info || {};
           const mainType = res?.result?.account_type || '';
           const keys = Object.keys(data);
           let content: any = []
           let mainKey = '';
           if (keys.length > 0) { 
             mainKey = keys[0];
             if (mainKey) { 
               content= general_overview_type(mainType,tr)
             }

           }
           setContent(content)
           setType(mainType)
           if (res?.result?.account_info[`account_${mainType}`]) {
             setData(res?.result?.account_info[`account_${mainType}`]);
           } else { 
             setData(res?.result?.account_info);
           }
         
        }
      );
    }
    

  }, [address])
  
  return <div className={styles.general}>
       <Card title={general_overview.title} ns='detail'>
      <Content content={content} data={data} ns={"detail"} />
    </Card>
     <Card title={account_change.title} ns='detail' className="h-full" header={
          <Tabs
            data={general_overview.options}
            ns='detail'
            className="tabs-right"
            defaultValue={interval}
            border={true}
            onChange={(value: any) => { 
              setInterval(value.value)

            }}
          />}>
        <AccountChange address={address} type={type} list={general_overview.list} interval={ interval}/>
    </Card> 
    <List account_id={address} ootions={ general_overview.message_list} />
  </div>
};
