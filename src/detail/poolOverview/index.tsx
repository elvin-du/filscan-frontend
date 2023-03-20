import { pool_overview } from "@/contants/detail";
import  Card  from "@/packages/card";
import { NodeItem } from "@/types";
import { useTranslation } from "react-i18next";
import Power from "./Power";
import styles from './style.module.scss'
import Overview from "./View";

interface Props { 
    title: NodeItem,
    data:any
}

export default (props: Props) => { 
    const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });
  };
    
    const { title,data}  = props
    return <Card title={title} ns='detail'>
        <div className={styles.owner_overview}>
          <div className={styles.owner_overview_chart}>
            <div className={styles.owner_overview_chart_balance}>
              <div>{tr(pool_overview.list.title)}</div>
              <div className='font-20'>
                {data?.account_indicator?.balance
                  ? `${Number(
                      data?.account_indicator?.balance
                    ).toFixed(4)} FIL`
                  : "1,623,367.4871 FIL"}
              </div>
            </div>
            <Overview data={data} />
          </div>
          <div className={styles.owner_overview_power}>
            <Power list={pool_overview.power_list} data={data?.account_indicator || {}}/>
          </div>
        </div>
      </Card>
}