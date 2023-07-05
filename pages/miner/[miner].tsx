/** @format */
import { useRouter } from "next/router";
import { account_overview, minder_details } from "@/contants/detail";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import PoolOverView from '@/src/detail/poolOverview'
import IndicatorsView from '@/src/detail/IndicatorsView'
import TrendView from '@/src/detail/trendView'
import List from "@/src/detail/list";
import styles from "../index.module.scss";
import Card from '@/packages/custom_card';
import Main from '@/packages/main'

 function Miner ()  {
  const router = useRouter();
  const { miner } = router.query;
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });
  };
  const [data, setData] = useState<any>({})

    useEffect(() => {
    if (miner) {
      postAxios(apiUrl.detail_account, {
        account_id: miner }).then(
          (res: any) => {
          setData(res?.result?.account_info?.account_miner);
        }
      );
    }
  
  }, [miner]);

  return (
    <div className={styles.miner}>
      <PoolOverView title={{
        label:`${tr(minder_details.pool_overview_title.label)}:  ${miner}`
      }} data={data} /> 
        <IndicatorsView accountId={miner}/>
        <TrendView accountId={miner} type='miner'/>   
       <Card title={account_overview.title.label} bgColor  ns='detail' >
        <Main
         itemSplit={ true}
          content={account_overview.list}
          data={data || {}}
          ns={"detail"}
        //   splitClassName={ styles.miner_account_overview}
        //  // warpClassName={ styles.miner_account_overview}
        //   ItemClassName={styles.miner_account_overview_item}
        /> 
      </Card>
     
      <List account_id={miner} />
    </div>
  );
};


  export default Miner;