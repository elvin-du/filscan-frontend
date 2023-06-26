/** @format */

import { chain_columns } from "@/contants/tipset";
import { isMobile } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import Main from '@/packages/main'
export default ({ data }: { data: Record<string, any> }) => {
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "tipset" });
    }
    return t(label, { ns: "tipset" });
  };


  console.log('=====2', chain_columns, isMobile())
  

  if (isMobile()) { 
    return <Main ns='tipset' content={chain_columns} data={data } warpClassName={styles.mobile_chain_card_content} />
  }


  return (
    <div className={styles.chain_card}>
      <div className={styles.chain_card_header}>
        {chain_columns.map((v,index) => {
          return (
            <div key={`header-${index}`} className={styles.chain_card_header_item}>{tr(v.title)}</div>
          );
        })}
      </div>
      <div className={styles.chain_card_content}>
        {chain_columns.map((v: any,index) => { 
          return <div key={`${index}_${v.dataIndex}`} className={`${styles.chain_card_content_item}`}>
            {v.render ? v.render(data[v.dataIndex],data) : <span>{ data[v.dataIndex]}</span>}
           </div>
        }) } 
      </div>
    </div>
  );
};
