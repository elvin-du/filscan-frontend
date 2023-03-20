/** @format */
import styles from "./index.module.scss";
import { getShowData } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import Tips from "../tips";

export default ({
  content,
  data,
  ns,
  bolder,
  warpClassName,
  ItemClassName
}: {
  content: Array<any>;
  data: Record<string, any>;
  ns: string;
    bolder?: boolean;
    warpClassName?: string
  ItemClassName?:string
}) => {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns });
  };

  return (
    <ul className={`${styles.content} ${warpClassName}`}>
      {content.map((item: any) => {
        let showData = getShowData(item, data);
        let value: any = showData && showData[item.dataIndex];
        let isHtml = false;
        if (item.render) {
          isHtml = false;
          value = item.render(value, item?.isRecord ? data : "");
        } else { 
          if (Array.isArray(value)) {
            value = value.join("<br />");
            isHtml = true;
          } else { 
            value = String(value);
          }
        }       
        return (
          <li
            key={item.title}
            className={`${styles.content_item}  ${
              bolder ? styles.content_bolder_item : ""
            } ${ItemClassName}`}>
            <span
              className={`${styles.content_item_label} ${styles.message_label}`}>
              {tr(item.title || item.label)}  {item.label_tip && <Tips context={ tr(item.label_tip)} />} :
             
            </span>
            <span className={`${styles.content_item_value}`}>
              {isHtml ? (
                <span
                  className={"html_br"}
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              ) : (
                value
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
