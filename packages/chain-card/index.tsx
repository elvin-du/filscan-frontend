/** @format */

import { chain_columns } from "@/contants/tipset";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
export default ({ data }: { data: Record<string, any> }) => {
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "tipset" });
    }
    return t(label, { ns: "tipset" });
  };
  return (
    <div className={styles.chain_card}>
      <div className={styles.chain_card_header}>
        {chain_columns.map((v) => {
          return (
            <div className={styles.chain_card_header_item}>{tr(v.title)}</div>
          );
        })}
      </div>
      <div className={styles.chain_card_content}>
        {chain_columns.map((v: any) => { 
          return <div key={v.dataIndex} className={`${styles.chain_card_content_item}`}>
            {v.render ? v.render(data.result,data[v.dataIndex]) : <span>{ data[v.dataIndex]}</span>}
           </div>
        }) } 
      </div>
    </div>
  );
};
