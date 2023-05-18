import { account_change, power_trend } from '@/contants/detail';
import AccountChange from '@/components/accountChange';
import PowerTrend from "@/components/powerTrend";
import Card from "@/packages/card";
import Tabs from '@/packages/tabs';
import styles from './style.module.scss';
import { useState } from 'react';

interface Props { 
    accountId: string | string[] | undefined,
    type:string
}
export default (props: Props) => { 

    const [interval, setInterval] = useState('1m');
    const { accountId ,type} = props;
    return   <div className={styles.account_content}>
        <Card title={account_change.title} ns='detail' className="h-full">
        <AccountChange address={accountId} type={type} list={account_change.list} interval={'1m'}/>
        </Card> 
        <Card title={power_trend.title} ns='detail' className="h-full" header={
          <Tabs
            data={power_trend.title.list}
            ns='detail'
            className="tabs-right"
            defaultValue={interval}
            border={true}
            onChange={(value: any) => { 
              setInterval(value.value)
            }}
          />}> 
            <PowerTrend address={accountId} type={ type} list={power_trend.list} interval={ interval}/>
        </Card>
      </div>
}