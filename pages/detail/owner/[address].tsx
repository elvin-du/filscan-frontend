/** @format */

import { detail_owner, detail_owner_overview, owner_account_change, owner_power_trend } from "@/contants/detail";
import { useTranslation } from "react-i18next";
import { postAxios } from "@/store/server";
import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import AccountChange from '@/components/accountChange'
import { useRouter } from "next/router";
import Card from "@/packages/card";
import Content from "@/packages/content";
import Overview from "@/src/owner/View";
import styles from "../index.module.scss";
import PowerTrend from "@/components/powerTrend";
import Tabs from '@/packages/tabs';

export default () => {
  const router = useRouter();
  const { address } = router.query;
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });
  };

  const [data, setData] = useState<any>();
  const [interval, setInterVal] = useState<any>('30d');
  
  useEffect(() => {
    if (address) {
      postAxios(apiUrl.detail_owne, { account_id: address }).then(
        (res: any) => {
          setData(res?.result?.account_info);
        }
      );
    }
  }, [address]);

  return (
    <div className={styles.owner}>
      <Card title={detail_owner.title} ns='detail'>
        <Content
          content={detail_owner.content}
          bolder={true}
          data={data}
          ns={"detail"}
        />
      </Card>
      <Card title={detail_owner_overview.title} ns='detail'>
        <div className={styles.owner_overview}>
          <div className={styles.owner_overview_chart}>
            <div className={styles.owner_overview_chart_balance}>
              <div>{tr(detail_owner_overview.list.title)}</div>
              <div className='font-20'>
                {data?.account_ore_pool?.account_ore?.balance
                  ? `${Number(
                      data?.account_ore_pool?.account_ore?.balance
                    ).toFixed(4)} FIL`
                  : "1,623,367.4871 FIL"}
              </div>
            </div>
            <Overview data={data} />
          </div>
          <div className={styles.overview_power}></div>
        </div>
      </Card>
      <div className={styles.account_change}>
   <Card title={owner_account_change.title} ns='detail' className="h-full">
          <AccountChange address={address} type='owner' list={owner_account_change.list} />
        </Card> 
        <Card title={owner_power_trend.title} ns='detail' className="h-full" header={
          <Tabs
            data={owner_power_trend.title.list}
            ns='detail'
            className="tabs-right"
            defaultValue={interval}
            border={true}
            onChange={(value: any) => { 
              setInterVal(value.value)
            }}
          />}> 
            
          <PowerTrend address={address} type='owner' list={owner_power_trend.list} interval={ interval}/>
        </Card>
      </div>
     
    </div>
  );
};
