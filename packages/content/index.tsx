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
  ItemClassName,
}: {
  content: Array<any>;
  data: Record<string, any>;
  ns: string;
    bolder?: boolean;
    warpClassName?: string
    ItemClassName?: string
}) => {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns });
  };

  return (
    <ul className={`${styles.content} ${warpClassName}`}>
      {content?.map((item: any,index:number) => {
        let showData = getShowData(item, data);
        let value: any = showData && showData[item.dataIndex];
        let isHtml = false;
        if (item.render) {
          isHtml = false;
          value = item.render(value, data,tr);
        } else { 
          if (Array.isArray(value)) {
            value = value.join("<br />");
            isHtml = true;
          } else { 
            value = String(value);
          }
        }
        if (item.isNs) { 
          value = tr(value)
        }
        if (!value) { 
          value ='--'
        }
        const ItemStyle = item?.style;
        if (item?.elasticity && value === '--') { 
          return null
        }
        return (
          <li
            key={index}
            style={{ ...ItemStyle || {} }}
            className={`${styles.content_item}  ${
              bolder ? styles.content_bolder_item : ""
              } ${ItemClassName}`}>
            
            <span
              style={{minWidth: !!ItemStyle? '':'180px' }}
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
