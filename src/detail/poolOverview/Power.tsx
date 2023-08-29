import { useTranslation } from "react-i18next";
import style from './style.module.scss';
import Tips from "@/packages/tips";
import { isMobile } from "@/utils/utils";
import { Skeleton } from "antd";

export default ({ list,data ,type}: { list: any,data:Record<string,any>,type?:string }) => {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });
  };
  return <div className={style.power_content}>
    <div className={style.power_content_header}>
      {list?.header?.map((item: any,index:number) => {
        const { dataIndex, render } = item;
        const value = render? render(data[item.dataIndex],data) :data[item.dataIndex]
        return <div className={style.power_content_header_item} key={ index}>
          <div>{tr(item.label)}</div>
          <div className={`${style.power_content_header_item_value} font-22`}>{value && value !== '--'?value:<Skeleton.Input style={{height:20}} active={true} size={'default'} block={false} />}</div>
        </div>
      })}
    </div>
    <div className={ style.power_content_content}>
      {list?.content?.map((item: any, index: number) => {
        if (type === 'owner' && item.label === 'sector_size') {
          return ''
        }
        const {dataIndex, render} = item
        let value = data[item.dataIndex];
        if (item.renderList) {
          value = <>
            {item.renderList.map((listItem:any,index:number )=> {
              return <span key={ index} style={{color:listItem.color}}>
                <span>{data[listItem.value]}</span>
                <span className={ style.power_content_value}>{tr(listItem.label)}</span>
              </span>
            })}
          </>
        }
        if (render) {
          value = render(value,data)
        }
        const ItemStyle = isMobile() ? {}: {
          width: item?.width,
          justifyContent: index % 2 || item?.width ? 'flex-end' : 'flex-start'
        }
        return <div className={style.power_content_content_item} key={ index} style={{ ...ItemStyle }}>
          <span>{tr(item.label)} {item.label_tip && <Tips context={ tr(item.label_tip)} />} :</span>
          <span className={`${item.renderList ? style.power_content_listValue : style.power_content_value}`}style={{justifyContent:index%2 ? 'end':'start'}} >{value ==='--' ? <Skeleton.Input style={{height:20}} active={true} size={'default'} block={false} />:value}</span>
        </div>
      })}
    </div>
  </div>
}