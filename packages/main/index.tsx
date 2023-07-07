/** @format */
import styles from "./index.module.scss";
import { getShowData, isMobile } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import Tips from "../tips";
import { render } from "@headlessui/react/dist/utils/render";

export default ({
  content,
  data,
  ns,
  border,
  splitFlex,
  itemSplit,
  splitClassName,
  warpClassName,
  ItemClassName,
}: {
  content: Array<any>;
  data: Record<string, any>;
    ns: string;
    splitFlex?: boolean
  itemSplit?: boolean;
    border?: boolean;
    splitClassName?: string;
    warpClassName?: string
    ItemClassName?: string
}) => {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns });
  };



  const renderChildren = (dataList:Array<any>) => { 
   return (
    <ul className={`${styles.content} ${warpClassName}`}>
       {dataList?.map((item: any, index: number) => {
         let showData = getShowData(item, data);
         let value: any = showData && showData[item.dataIndex];
         let isHtml = false;
         if (item.render) {
           if (item.elasticity && Array.isArray(value) && value?.length === 0) {
             value = '--'
           } else {
             isHtml = false;
             value = item.render(value, data, tr)
           }
         } else {
           if (Array.isArray(value) && value.length > 0) {
             value = value.join("<br />");
             isHtml = true;
           } else {
             value = value ? String(value) : '--';
           }
         }
         const ItemStyle = isMobile() ? {} : item?.style || {} ;
        if (item?.elasticity && value === '--'  || item?.elasticity && !value) { 
          return null
        }
        return (
          <li
            key={index}
            style={{
              
              //  paddingTop: ItemStyle?.borderTop || ItemStyle?.borderBottom ? '20px' : '',
              // marginTop: ItemStyle?.borderTop || ItemStyle?.borderBottom ? '10px' : '',
                 ...ItemStyle || {},
            }}
            className={`${styles.content_item}  ${border ? styles.content_bolderItem : ""} ${itemSplit ? styles.content_itemSplit :''}  ${ItemClassName}`}>
            <div
              style={{minWidth: !!ItemStyle?.width? '0px':'' }}
              className={`${styles.content_item_label} ${styles.message_label}`}>
              {typeof item.title === 'function' ? <span className="flex_align_center">{item.title(tr)}</span> :
                <span className="flex_align_center">{tr(item.title || item.label)}  {item.label_tip && <Tips context={tr(item.label_tip)} />}:</span>}
             
             
            </div>
            <div className={`${styles.content_item_value} ${item.render ? styles.content_item_valueRender:''}`}>
              {isHtml ? (
                <span
                  className={"html_br"}
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              ) : (
                value
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
  }


  if (splitFlex) { 
    return <div className={`${styles.wrap_content} ${splitClassName}`}>
      {content.map(contentItem => { 
        return renderChildren(contentItem)
      }) }
    </div>
  }
  return renderChildren(content)
};
