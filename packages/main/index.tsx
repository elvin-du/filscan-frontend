/** @format */
import styles from "./index.module.scss";
import { getShowData } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import Tips from "../tips";

export default ({
  content,
  data,
  ns,
  border,
  warpClassName,
  ItemClassName,
}: {
  content: Array<any>;
  data: Record<string, any>;
  ns: string;
    border?: boolean;
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
          if (item.elasticity && Array.isArray(value) && value?.length === 0) {
            value ='--'
          } else { 
            isHtml = false;
            value = item.render(value, data,tr);
          }
        } else { 
          if (Array.isArray(value) && value.length > 0) {
            value = value.join("<br />");
            isHtml = true;
          } else { 
            value = String(value);
          }    
          if (!value || value.length === 0)   { 
            value ='--'
          }
        }
       
        const ItemStyle = item?.style;
        if (item?.elasticity && value === '--') { 
          return null
        }
        return (
          <li
            key={index}
            style={{
              ...ItemStyle || {},
              paddingTop: ItemStyle?.borderTop ? '20px' : '15px',
              marginTop: ItemStyle?.borderTop ? '10px' : '0px',
            }}
            className={`${styles.content_item}  ${border ? styles.content_bolderItem : ""} ${ItemClassName}`}>
            <span
              style={{minWidth: !!ItemStyle?.width? '0px':'180px' }}
              className={`${styles.content_item_label} ${styles.message_label}`}>
              {typeof item.title === 'function' ? <span className="flex-center">{item.title(tr)}</span> :
                <span className="flex-center">{tr(item.title || item.label)}  {item.label_tip && <Tips context={tr(item.label_tip)} />}:</span>}
             
             
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
