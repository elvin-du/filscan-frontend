/** @format */

import { chain_columns } from "@/contants/tipset";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import { isIndent } from "@/utils/utils";
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
          let text = "--";
          if (!v.type) {
            text = data[v.dataIndex];
          } else {
            const [first, seconed] = v.type;
            const showData = data[first];
            text = Array.isArray(showData)
              ? showData
                  .map((item: any) => {
                    if (v.isIndent && seconed)
                      return isIndent(item[seconed][v.dataIndex]);
                    if (seconed) return item[seconed][v.dataIndex] || "--";
                    return item[v.dataIndex];
                  })
                  .join("<br />")
              : showData[v.dataIndex];
          }
          return (
            <div
              className={`${styles.chain_card_content_item} ${
                v.class ? v.class : ""
              }`}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          );
        })}
      </div>
    </div>
  );
};
