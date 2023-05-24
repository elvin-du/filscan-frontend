import { pool_overview } from "@/contants/detail";
import  Card  from "@/packages/card";
import { NodeItem } from "@/types";
import { formatFil, getShowData } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import Power from "./Power";
import styles from './style.module.scss'
import Overview from "./View";

interface Props { 
    title: NodeItem,
  data: any,
  type?:string
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
                  ? `${formatFil(data?.account_indicator?.balance ,'FIL',3)} FIL`
                  : "--"}
            </div>
              {
                 pool_overview.list.content?.map((item: any) => {
                  const showData = getShowData(item, data);
                  const value = showData && showData[item.dataIndex] ? formatFil(showData[item.dataIndex]): "--";
                  const name = `${tr(item.label)}: ${value !== '--' ? formatFil(value ,'FIL',3):'--'} FIL`;
                  // legendData.push(name);
                   return <div>
                     { name}
                  </div>
                 })
            }
            
          
            </div>
            <Overview data={data} />
          </div>
          <div className={styles.owner_overview_power}>
          <Power type={ props.type} list={pool_overview.power_list} data={data?.account_indicator || {}}/>
          </div>
        </div>
      </Card>
}